from fastapi import FastAPI

from app.routes.health import router as health_router
from app.routes.resume import router as resume_router
from app.routes.interview import (
    router as interview_router,
)
from app.routes.evaluation import router as evaluation_router

app = FastAPI(
    title="AI Interview Service",
    version="1.0.0",
)


app.include_router(health_router)
app.include_router(resume_router)
app.include_router(interview_router)
app.include_router(evaluation_router)