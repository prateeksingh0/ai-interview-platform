import os

import ollama
from dotenv import load_dotenv

load_dotenv()

MODEL = os.getenv(
    "OLLAMA_MODEL",
    "qwen3:8b",
)

OLLAMA_HOST = os.getenv(
    "OLLAMA_HOST",
    "http://localhost:11434",
)

client = ollama.Client(
    host=OLLAMA_HOST
)

OLLAMA_OPTIONS = {
    "temperature": float(
        os.getenv("OLLAMA_TEMPERATURE", "0.2")
    ),
    "top_p": float(
        os.getenv("OLLAMA_TOP_P", "0.9")
    ),
    "num_predict": int(
        os.getenv("OLLAMA_NUM_PREDICT", "700")
    ),
    "num_ctx": int(
        os.getenv("OLLAMA_CONTEXT", "4096")
    ),
}

KEEP_ALIVE = os.getenv(
    "OLLAMA_KEEP_ALIVE",
    "30m",
)