import json
import time

from app.services.ollama_service import (
    client,
    MODEL,
    OLLAMA_OPTIONS,
)


def generate_questions(
    resume_text: str,
    role: str,
    difficulty: str,
):
    prompt = f"""
You are an expert technical interviewer.

Generate exactly 10 interview questions.

Role:
{role}

Difficulty:
{difficulty}

Resume:
{resume_text}

Return ONLY valid JSON.

Format:

{{
  "questions":[
    {{
      "question":"...",
      "type":"TECHNICAL"
    }}
  ]
}}

Rules:

- Exactly 10 questions
- 4 TECHNICAL
- 3 BEHAVIORAL
- 3 CODING

The "type" field MUST be exactly one of:

TECHNICAL
BEHAVIORAL
CODING

Never invent new values.

Return ONLY valid JSON.

Do not explain anything.

Do not use markdown.

Do not wrap the JSON inside triple backticks.

Return ONLY JSON.
"""
    start = time.perf_counter()
    
    response = client.chat(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        format="json",
        think=False,
        options=OLLAMA_OPTIONS,
    )
    
    end = time.perf_counter()

    print(
        f"Question generation took {end-start:.2f} seconds"
    )

    content = response["message"]["content"]

    try:
        result = json.loads(content)
    except json.JSONDecodeError:
        raise Exception("Ollama returned invalid JSON.")

    if "questions" not in result:
        raise Exception("Invalid response from Ollama.")

    VALID_TYPES = {
        "TECHNICAL",
        "BEHAVIORAL",
        "CODING",
    }

    for question in result["questions"]:
        question.setdefault("question", "")

        question.setdefault("type", "TECHNICAL")

        if question["type"] not in VALID_TYPES:
            question["type"] = "TECHNICAL"

    return result