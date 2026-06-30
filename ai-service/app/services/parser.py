import pdfplumber
from docx import Document


def extract_pdf_text(file_path: str) -> str:
    text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    return text.strip()


def extract_docx_text(file_path: str) -> str:
    document = Document(file_path)

    paragraphs = [
        paragraph.text
        for paragraph in document.paragraphs
    ]

    return "\n".join(paragraphs).strip()


def extract_text(file_path: str) -> str:
    if file_path.lower().endswith(".pdf"):
        return extract_pdf_text(file_path)

    if file_path.lower().endswith(".docx"):
        return extract_docx_text(file_path)

    raise Exception("Unsupported file type")