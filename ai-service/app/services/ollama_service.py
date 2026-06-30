import json
import os

import ollama
from dotenv import load_dotenv

load_dotenv()

MODEL = os.getenv("OLLAMA_MODEL", "qwen3:8b")

OLLAMA_HOST = os.getenv(
    "OLLAMA_HOST",
    "http://host.docker.internal:11434"
)

client = ollama.Client(host=OLLAMA_HOST)

OLLAMA_OPTIONS = {
    "temperature": 0.2,
    "top_p": 0.9,
    "num_predict": 700,
    "num_ctx": 4096,
}


def analyze_resume(resume_text: str, job_description: str):
    prompt = f"""
You are an expert ATS Resume Analyzer.

Analyze the resume against the job description.

Return ONLY valid JSON.

Use EXACTLY this schema:

{{
  "ats_score": 0,
  "matching_score": 0,
  "matching_skills": [],
  "missing_skills": [],
  "summary": "",
  "improvement_suggestions": [],
  "rewrite_suggestions": [],
  "keyword_analysis": [
    {{
      "keyword": "",
      "status": ""
    }}
  ]
}}

Rules:

1. Compare the resume with the Job Description.

2. "matching_skills" should contain skills found in BOTH the resume and the job description.

3. "missing_skills" should contain skills required by the job description but NOT found in the resume.

4. "keyword_analysis" MUST contain EVERY important keyword from the job description.

5. Each keyword_analysis item MUST have:

{{
  "keyword": "React.js",
  "status": "Present"
}}

or

{{
  "keyword": "Docker",
  "status": "Missing"
}}

6. status MUST be ONLY one of:

- "Present"
- "Missing"

7. NEVER use:
- Unknown
- N/A
- Maybe
- Partial
- True
- False
- Yes
- No

8. If a keyword appears anywhere in the resume,
mark it as "Present".

9. Otherwise mark it as "Missing".

10. Return ONLY valid JSON.
Do not wrap the response in markdown.
Do not explain your answer.

Resume:

{resume_text}

Job Description:

{job_description}
"""

    response = client.chat(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    content = response["message"]["content"].strip()

    # Remove markdown fences if the model adds them
    if content.startswith("```"):
        content = content.replace("```json", "")
        content = content.replace("```", "")
        content = content.strip()

    return json.loads(content)