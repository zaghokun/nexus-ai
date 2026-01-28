from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.models import ChatSession, ChatMessage
import uuid

class ChatService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_or_create_session(self, session_id: uuid.UUID = None):
        if session_id:
            result = await self.db.execute(select(ChatSession).where(ChatSession.id == session_id))
            session = result.scalars().first()
            if session:
                return session
            
        new_session = ChatSession(title="New Chat")
        self.db.add(new_session)
        await self.db.commit()
        await self.db.refresh(new_session)
        return new_session

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