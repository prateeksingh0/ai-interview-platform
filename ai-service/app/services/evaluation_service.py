import json

from app.services.ollama_service import client, MODEL


def evaluate_answer(
    question: str,
    user_answer: str,
    resume_text: str,
    role: str,
    difficulty: str,
    question_type: str,
):
    prompt = f"""
You are an expert technical interviewer.

Evaluate the candidate's answer.

Role:
{role}

Difficulty:
{difficulty}

Question Type:
{question_type}

Resume:
{resume_text}

Interview Question:
{question}

Candidate Answer:
{user_answer}

Return ONLY valid JSON.

Format:

{{
  "score": 0,
  "feedback": "",
  "strong_points": [],
  "weak_points": []
}}

Rules:

- Score between 0 and 10.
- Be fair and constructive.
- Return ONLY JSON.
- Do not use markdown.
"""

    response = client.chat(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        format="json",
    )

    content = response["message"]["content"]

    result = json.loads(content)

    result.setdefault("score", 0)
    result.setdefault("feedback", "")
    result.setdefault("strong_points", [])
    result.setdefault("weak_points", [])

    return result