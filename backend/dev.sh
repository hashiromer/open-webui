#!/bin/bash

# Extract host and port from VITE_BACKEND_DEV_URL
HOST="$(echo "$VITE_BACKEND_DEV_URL" | awk -F[/:] '{print $4}')"
PORT="$(echo "$VITE_BACKEND_DEV_URL" | awk -F':' '{print $NF}')"

uvicorn open_webui.main:app --port "$PORT" --host "$HOST" --forwarded-allow-ips '*' --reload