# app/core/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    PROJECT_NAME: str = "Nexus AI"
    GOOGLE_API_KEY:str

    class Config:
        env_file = ".env"

settings = Settings()