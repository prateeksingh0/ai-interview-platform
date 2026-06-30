import os
import shutil
import uuid

from fastapi import APIRouter, File, UploadFile

from app.services.parser import extract_text

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/extract")
async def extract_resume(file: UploadFile = File(...)):
    extension = os.path.splitext(file.filename)[1]

    filename = f"{uuid.uuid4()}{extension}"

    file_path = os.path.join(
        UPLOAD_DIR,
        filename,
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        extracted_text = extract_text(file_path)

        return {
            "success": True,
            "text": extracted_text,
        }

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)