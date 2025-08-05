#!/bin/bash
cd "$(dirname "$0")"
source venv/bin/activate
uvicorn backend_api:app --reload --port 8000 