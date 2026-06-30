import json
import time

from app.services.ollama_service import (
    client,
    MODEL,
    OLLAMA_OPTIONS,
    KEEP_ALIVE,
)


def evaluate_answer(
    question: str,
    user_answer: str,
    resume_text: str,
    role: str,
    difficulty: str,
    question_type: str,
):
    prompt = f"""
You are an expert professional interviewer experienced in evaluating candidates across all industries.

Evaluate the candidate's answer professionally.

Candidate Role:
{role}

Difficulty:
{difficulty}

Question Type:
{question_type}

Candidate Resume:
{resume_text}

Interview Question:
{question}

Candidate Answer:
{user_answer}

Evaluation Guidelines:

- Evaluate according to the selected Candidate Role.
- The Candidate Role has higher priority than the resume.
- Use the resume only to understand the candidate's background.
- Do not expect knowledge unrelated to the selected role.
- Consider the selected difficulty level.

Evaluate:

- Accuracy
- Relevance to the role
- Practical knowledge
- Communication
- Problem-solving
- Completeness

For technical roles:
Evaluate technical correctness and best practices.

For non-technical roles:
Evaluate professional knowledge, reasoning, decision-making and communication.

Return ONLY valid JSON using this exact schema:

{{
  "score": 0,
  "feedback": "",
  "strong_points": [],
  "weak_points": []
}}

Rules:

- Score between 0 and 10.
- Feedback should be constructive and professional.
- Strong points and weak points should contain concise bullet-style statements.
- Return valid JSON only.
- Do not explain anything.
- Do not use markdown.
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
        keep_alive=KEEP_ALIVE,
    )
    
    end = time.perf_counter()

    print(
        f"Evaluation took {end-start:.2f} seconds"
    )

    content = response["message"]["content"]

    result = json.loads(content)

    result.setdefault("score", 0)
    result.setdefault("feedback", "")
    result.setdefault("strong_points", [])
    result.setdefault("weak_points", [])

    return result