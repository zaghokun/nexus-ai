import os
import uuid
import google.generativeai as genai
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.models import ChatSession, ChatMessage 

class ChatService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_or_create_session(self, session_id: uuid.UUID = None):
        if session_id:
            result = await self.db.execute(select(ChatSession).where(ChatSession.id == session_id))
            session = result.scalars().first()
            if session:
                return session
            
        new_session = ChatSession(
            id=session_id if session_id else uuid.uuid4(),
            title="New Chat"
        )
        self.db.add(new_session)
        await self.db.commit()
        await self.db.refresh(new_session)
        return new_session
    
    async def get_all_sessions(self, limit: int = 20):
        stmt = select(ChatSession).order_by(ChatSession.created_at.desc()).limit(limit)
        result = await self.db.execute(stmt)
        sessions = result.scalars().all()
        return sessions

    async def get_message_by_session(self, session_id: str):
        stmt = select(ChatMessage).where(ChatMessage.session_id == session_id).order_by(ChatMessage.created_at.asc())
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def save_message(self, session_id: uuid.UUID, role: str, content: str):
        message = ChatMessage(session_id=session_id, role=role, content=content)
        self.db.add(message)
        await self.db.commit()
        await self.db.refresh(message)
        return message

    async def get_history(self, session_id: uuid.UUID):
        result = await self.db.execute(
            select(ChatMessage)
            .where(ChatMessage.session_id == session_id)
            .order_by(ChatMessage.created_at.asc())
        )
        return result.scalars().all()
    
    async def send_message(self, session_id: str, content: str):
        try:
            uuid_session_id = uuid.UUID(str(session_id))
        except ValueError:
            uuid_session_id = None

        session = await self.get_or_create_session(uuid_session_id)
        
        if session.title == "New Chat":
            session.title = content[:30] + "..." if len(content) > 30 else content
            self.db.add(session)
            await self.db.commit()

        await self.save_message(session.id, "user", content)

        history_messages = await self.get_history(session.id)
        
        gemini_history = []
        for msg in history_messages:
            if msg.content == content and msg.role == "user" and msg == history_messages[-1]:
                continue
                
            role = "user" if msg.role == "user" else "model"
            gemini_history.append({"role": role, "parts": [msg.content]})

        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            yield "Error: API Key Gemini belum disetting di .env"
            return

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-pro")
        
        chat = model.start_chat(history=gemini_history)
        
        try:
            response = chat.send_message(content, stream=True)
            
            full_ai_response = ""
            for chunk in response:
                if chunk.text:
                    full_ai_response += chunk.text
                    yield chunk.text
            
            await self.save_message(session.id, "assistant", full_ai_response)

        except Exception as e:
            yield f"\n[System Error: {str(e)}]"