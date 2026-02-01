from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.chat import ChatRequest, ChatRespone
from app.services.chat_service import ChatService
from app.services.llm_service import LLMService
from typing import List
from app.schemas.chat import MessageSchema

router = APIRouter()

@router.post("/send")
async def send_message(request:ChatRequest, db: AsyncSession=Depends(get_db)):
    service = ChatService(db)
    llm_service = LLMService()

    # 1. Handle Session
    session = await service.get_or_create_session(request.session_id)

    # 2. Get Previous History
    previous_history = await service.get_history(session.id)

    # 3. Save new user's message to db
    await service.save_message(session.id, "user", request.message)

    # 4. Generate Streaming Response
    return StreamingResponse(
        llm_service.stream_response(
            request.message,
            previous_history,
            session.id,
            db
        ),
        media_type="text/event-stream"
    )

@router.get("/sessions")
async def get_chat_history(db: AsyncSession = Depends(get_db)):
    service = ChatService(db)
    sessions = await service.get_all_sessions()

    return[
        {
            "id": str(session.id),
            "title": session.title or "New Chat",
            "updated_at": session.created_at
        }
        for session in sessions
    ]

@router.get("/{session_id}/messages")
async def get_session_messages(session_id: str, db: AsyncSession = Depends(get_db)):
    service = ChatService(db)
    messages = await service.get_message_by_session(session_id)
    return messages

@router.get("/history/{session_id}", response_model=List[MessageSchema])
async def get_chat_history(
    session_id: str,
    db: AsyncSession = Depends(get_db)
):
    service = ChatService(db)
    return await service.get_history(session_id)