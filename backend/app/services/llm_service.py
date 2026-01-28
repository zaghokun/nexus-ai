from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from app.services.chat_service import ChatService
from app.core.config import settings

class LLMService:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            google_api_key=settings.GOOGLE_API_KEY,
            temperature=0.7
        )
    
    def _format_history(self, db_history: list):
        formatted_messages = []

        system_instruction = """
            Kamu adalah Nexus AI, asisten spesialis Analisis Data dan Pengolahan Informasi yang cerdas.
            Tugas utamamu:
            1. Membantu user memahami data, membersihkan data (cleaning), dan visualisasi.
            2. Jika user bertanya coding, berikan solusi Python (terutama Pandas, NumPy, Matplotlib).
            3. Gaya bicara: Profesional, to-the-point, tapi tetap ramah.
            4. Gunakan format Markdown untuk tabel dan code block.
            """

        formatted_messages.append(SystemMessage(content=system_instruction))

        for msg in db_history:
            if msg.role == "user":
                formatted_messages.append(HumanMessage(content=msg.content))
            elif msg.role == "assistant":
                formatted_messages.append(AIMessage(content=msg.content))
        
        return formatted_messages

    async def generate_response(self, user_message: str, history: list) -> str:
        messages = self._format_history(history)

        messages.append(HumanMessage(content=user_message))

        response = await self.llm.ainvoke(messages)
        return response.content
    
    async def stream_response(self, user_message: str, history: list, session_id, db_session):
        # 1. Setup History
        messages = self._format_history(history)
        messages.append(HumanMessage(content=user_message))

        full_response = ""

        # 2. Stream Loop
        async for chunck in self.llm.astream(messages):
            content = chunck.content
            full_response+=content
            yield content
        
        chat_service = ChatService(db_session)
        await chat_service.save_message(session_id, "assistant", full_response)