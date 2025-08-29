#!/bin/bash

# Create server directory if it doesn't exist
mkdir -p server

# Check if package.json exists in server directory
if [ ! -f "server/package.json" ]; then
  echo "Creating server package.json..."
  cat > server/package.json << EOF
{
  "name": "sparti-content-server",
  "version": "1.0.0",
  "description": "Content management server for Sparti Builder",
  "main": "content-server.js",
  "scripts": {
    "start": "node content-server.js"
  },
  "dependencies": {
    "express": "^5.1.0",
    "cors": "^2.8.5"
  }
}
EOF
fi

# Check if node_modules exists in server directory
if [ ! -d "server/node_modules" ]; then
  echo "Installing server dependencies..."
  cd server
  npm install
  cd ..
fi

# Start the content server
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