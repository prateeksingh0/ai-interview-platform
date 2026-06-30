from fastapi import APIRouter

from app.schemas.interview import (
    GenerateQuestionsRequest,
)

from app.services.question_generator import (
    generate_questions,
)

router = APIRouter(
    prefix="/interview",
    tags=["Interview"],
)


@router.post("/questions")
async def questions(
    data: GenerateQuestionsRequest,
):
    result = generate_questions(
        resume_text=data.resume_text,
        role=data.role,
        difficulty=data.difficulty,
    )

    return {
        "success": True,
        "data": result,
    }