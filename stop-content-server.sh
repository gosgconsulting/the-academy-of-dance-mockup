#!/bin/bash

# Stop the content server
if [ -f "content-server.pid" ]; then
    PID=$(cat content-server.pid)
    kill $PID 2>/dev/null
    rm content-server.pid
    echo "Content server stopped (PID: $PID)"
else
    pkill -f content-server.js
    echo "Content server stopped"
fi