#!/bin/sh

# Extract host and port from BACKEND_DEV_URL
HOST="$(echo "$BACKEND_DEV_URL" | awk -F[/:] '{print $4}')"
PORT="$(echo "$BACKEND_DEV_URL" | awk -F':' '{print $NF}')"

#Make sure FRONTEND_DEV_URL is set
if [ -z "$FRONTEND_DEV_URL" ]; then
  echo "Error: FRONTEND_DEV_URL is not set."
  exit 1
fi

echo "Starting uvicorn server at $HOST:$PORT"

uvicorn open_webui.main:app --port "$PORT" --host "$HOST" --forwarded-allow-ips '*' --reload