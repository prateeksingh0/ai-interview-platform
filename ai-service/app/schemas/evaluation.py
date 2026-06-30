from pydantic import BaseModel


class EvaluateAnswerRequest(BaseModel):
    question: str
    user_answer: str
    resume_text: str
    role: str
    difficulty: str
    question_type: str