import json
import time

from app.services.ollama_service import (
    client,
    MODEL,
    OLLAMA_OPTIONS,
    KEEP_ALIVE,
)


def generate_questions(
    resume_text: str,
    role: str,
    difficulty: str,
):
    prompt = f"""
You are an expert professional interviewer with experience interviewing candidates across all industries and professions.

Generate exactly 10 realistic interview questions.

Candidate Role:
{role}

Difficulty:
{difficulty}

Candidate Resume:
{resume_text}

Instructions:

- The selected Candidate Role is the HIGHEST priority.
- Generate questions specifically for the selected role.
- Use the resume ONLY to personalize the questions.
- Ignore resume experience that is unrelated to the selected role.
- Questions should reflect real interview practices used by employers.
- Match the selected difficulty level.
- Avoid generic questions.

Question Distribution:

- 4 TECHNICAL
- 3 BEHAVIORAL
- 3 CODING

Definitions:

TECHNICAL:
Questions that assess professional knowledge required for the selected role.

BEHAVIORAL:
Questions about communication, teamwork, leadership, conflict resolution, adaptability and work experience.

CODING:
If the role is technical, generate coding or implementation questions.
If the role is non-technical, generate practical case-study, scenario-based or analytical problem-solving questions while keeping the type as "CODING".

Return ONLY valid JSON using this exact schema:

{{
  "questions": [
    {{
      "question": "Question text",
      "type": "TECHNICAL"
    }}
  ]
}}

Rules:

- Exactly 10 questions.
- Never leave any question empty.
- Never repeat a question.
- type must ONLY be:
  TECHNICAL
  BEHAVIORAL
  CODING
- Return JSON only.
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
        f"Question generation took {end-start:.2f} seconds"
    )

    content = response["message"]["content"]

    try:
        result = json.loads(content)
    except json.JSONDecodeError:
        raise Exception("Ollama returned invalid JSON.")

    if "questions" not in result:
        raise Exception("Invalid response from Ollama.")

    questions = result.get("questions", [])

    if len(questions) != 10:
        raise Exception(
            f"Expected 10 questions but received {len(questions)}."
        )

    VALID_TYPES = {
        "TECHNICAL",
        "BEHAVIORAL",
        "CODING",
    }

    counts = {
        "TECHNICAL": 0,
        "BEHAVIORAL": 0,
        "CODING": 0,
    }

    for question in questions:

        if not question.get("question", "").strip():
            raise Exception("Generated question is empty.")

        if question["type"] not in VALID_TYPES:
            raise Exception(
                f"Invalid question type: {question['type']}"
            )

        counts[question["type"]] += 1

    if counts != {
        "TECHNICAL": 4,
        "BEHAVIORAL": 3,
        "CODING": 3,
    }:
        raise Exception(
            f"Invalid distribution: {counts}"
        )
    return result