@echo off
echo Starting content server...

:: Create necessary directories
mkdir server 2>nul
mkdir public\content 2>nul
mkdir public\content\sections 2>nul
mkdir public\content\pages 2>nul

:: Change to server directory
cd server

:: Start the content server
start /B node content-server.js

:: Display information
echo Content server started
echo Server running on http://localhost:3001
echo API endpoints available at http://localhost:3001/api/content
echo.
echo To stop the server, close the command prompt window or use Task Manager to end the Node.js process
