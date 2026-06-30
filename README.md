# AI Interview Preparation Platform

An AI-powered interview preparation platform that helps users practice job interviews using locally hosted Large Language Models (Ollama).

Users can upload their resume, generate interview questions based on their target role, answer questions, receive AI evaluation, and track their interview performance.

---

## Features

- User Authentication
- Resume Upload & Parsing
- AI Resume Analysis
- AI Interview Question Generation
- AI Answer Evaluation
- Interview History
- Analytics Dashboard
- User Profile Management
- Docker Support

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Shadcn/UI
- Axios

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication

### AI Service

- Python
- FastAPI
- Ollama
- Local LLM (Qwen3 8B)

### DevOps

- Docker
- Docker Compose

---

## Project Structure

```
client/
server/
ai-service/
docker-compose.yml
README.md
```

---

## Installation

### Clone

```bash
git clone <repository-url>

cd ai-interview-platform
```

---

### Configure Environment Variables

Copy every `.env.example` file.

```
client/.env.example
server/.env.example
ai-service/.env.example
```

Rename them to

```
.env
```

and update the values if needed.

---

## Local Development

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### AI Service

```bash
cd ai-service

python -m venv venv

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Docker

```bash
docker compose up --build
```

Run database migrations

```bash
docker compose exec server npx prisma migrate deploy
```

---

## AI Workflow

1. Upload Resume
2. Resume Parsing
3. Resume Analysis
4. Generate Interview Questions
5. Submit Answers
6. AI Evaluation
7. View Analytics

---

## Screens

- Dashboard
- Resume
- Interview
- Results
- Analytics
- History
- Profile

---

## Future Improvements

- Streaming AI responses
- Voice interviews
- Multi-language interviews
- Better analytics
- More LLM support

---

## License

MIT License