from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[UUID] = None

class MessageSchema(BaseModel):
    id: UUID
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True

class ChatRespone(BaseModel):
    session_id: UUID
    session_title: Optional[str]
    messages: List[MessageSchema]
    respone: str