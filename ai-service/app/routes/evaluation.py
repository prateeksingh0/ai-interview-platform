from fastapi import APIRouter

from app.schemas.evaluation import EvaluateAnswerRequest
from app.services.evaluation_service import evaluate_answer

router = APIRouter(
    prefix="/interview",
    tags=["Interview"],
)


@router.post("/evaluate")
async def evaluate(data: EvaluateAnswerRequest):
    result = evaluate_answer(
        question=data.question,
        user_answer=data.user_answer,
        resume_text=data.resume_text,
        role=data.role,
        difficulty=data.difficulty,
        question_type=data.question_type,
    )

    return {
        "success": True,
        "data": result,
    }