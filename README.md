# 🧠 Nexus AI (Backend API)

![Status](https://img.shields.io/badge/Status-Active_Development-green)
![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)

**Nexus AI** is an enterprise-grade backend service designed to power intelligent data analysis chatbots. Unlike simple wrappers, this project implements a robust architecture featuring **asynchronous processing**, **context-aware memory**, and **real-time streaming responses**.

Built with **FastAPI** and **LangChain**, it leverages Google's **Gemini Pro** to act as a specialized Data Analyst assistant, capable of retaining conversation history and serving multiple concurrent users efficiently.

---

## 🚀 Key Features

* **⚡ High-Performance Async API:** Built on FastAPI with full `async/await` support for handling concurrent requests.
* **🌊 Real-Time Streaming (SSE):** Delivers AI responses token-by-token (Server-Sent Events) for a superior User Experience (UX).
* **🧠 Context Awareness:** "Remembers" previous conversation turns within a session using sophisticated prompt engineering and history retrieval.
* **🗄️ Persistent Memory:** Stores users, sessions, and messages in **PostgreSQL** using **SQLAlchemy 2.0 (Async ORM)**.
* **🐳 Containerized Database:** Fully integrated with **Docker Compose** for consistent development environments.
* **📊 Data Analyst Persona:** The AI is fine-tuned via system prompts to specialize in Python coding, data cleaning, and visualization tasks.

---

## 🛠️ Tech Stack

* **Language:** Python 3.12
* **Framework:** FastAPI (Uvicorn)
* **Database:** PostgreSQL 15 (via Docker)
* **ORM:** SQLAlchemy (Asyncpg driver)
* **Migrations:** Alembic
* **AI Orchestration:** LangChain
* **LLM Provider:** Google Gemini Pro
* **Validation:** Pydantic

---

## 📂 Project Structure (Monorepo)

```bash
nexus-ai/
├── backend/               # The Brain (FastAPI)
│   ├── alembic/           # Database migrations
│   ├── app/
│   │   ├── api/           # Endpoints (Chat, Sessions)
│   │   ├── core/          # Config & Database connections
│   │   ├── models/        # SQLAlchemy ORM Models
│   │   ├── schemas/       # Pydantic Data Schemas
│   │   └── services/      # Business Logic (LLM, Chat Service)
│   ├── .env               # Environment variables
│   └── main.py            # Entry point
├── frontend/              # The Beauty (React - Coming Soon)
└── docker-compose.yml     # Database orchestration
```

## ⚡ Quick StartPrerequisitesPython 3.10+Docker & Docker Compose

### 1. Clone the Repository
```Bash
git clone [https://github.com/yourusername/nexus-ai.git](https://github.com/yourusername/nexus-ai.git)
cd nexus-ai
```

### 2. Start the Database
This will spin up a PostgreSQL container on port 5432.
```Bash
docker compose up -d
```

### 3. Setup Backend
Navigate to the backend folder and install dependencies.
```Bash
cd backend
python -m venv venv
# Activate venv (Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate)
pip install -r requirements.txt
```
4. Configure Environment
Create a .env file in the backend/ directory:
```bash
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/nexus_ai_db
GOOGLE_API_KEY=your_gemini_api_key_here
```
5. Run Database Migrations
Create the tables in PostgreSQL.
```Bash
alembic upgrade head
```
6. Launch Server
```Bash
uvicorn app.main:app --reload
```
Access the API Documentation at: http://127.0.0.1:8000/docs

## 📡 API Endpoints
MethodEndpointDescriptionPOST/api/chat/sendSend a message & receive a streaming response.
GET/api/chat/history/{session_id}Retrieve full chat history for a specific session.

## 🗺️ Roadmap
[x] Phase 1: Backend Foundation (FastAPI, SQL, Docker)

[x] Phase 2: AI Logic (LangChain, Streaming, Memory)

[ ] Phase 3: Frontend UI (React, TypeScript, Shadcn UI)

[ ] Phase 4: Authentication (JWT, OAuth2)

[ ] Phase 5: RAG (PDF Analysis) Integration

# Made with ❤️ and Python.