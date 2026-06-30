from pydantic import BaseModel


class GenerateQuestionsRequest(BaseModel):
    resume_text: str
    role: str
    difficulty: str