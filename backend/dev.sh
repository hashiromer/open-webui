#!/bin/bash

# Extract host and port from BACKEND_DEV_URL
HOST="$(echo "$BACKEND_DEV_URL" | awk -F[/:] '{print $4}')"
PORT="$(echo "$BACKEND_DEV_URL" | awk -F':' '{print $NF}')"

uvicorn open_webui.main:app --port "$PORT" --host "$HOST" --forwarded-allow-ips '*' --reload