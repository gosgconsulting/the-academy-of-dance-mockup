#!/bin/bash

# Start the content server in the background
echo "Starting content server..."
cd server
node content-server.js &
SERVER_PID=$!

echo "Content server started with PID: $SERVER_PID"
echo "Server running on http://localhost:3001"
echo "API endpoints available at http://localhost:3001/api/content"

# Save PID to file for later cleanup
echo $SERVER_PID > content-server.pid

echo "To stop the server, run: kill $SERVER_PID"
echo "Or use: pkill -f content-server.js"