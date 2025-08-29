#!/bin/bash

# Quick test to verify the content server is working
echo "Testing content server..."

# Wait a moment for server to start
sleep 2

# Test health endpoint
echo "Testing health endpoint..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/health)

if [ "$response" = "200" ]; then
    echo "✅ Content server is running successfully!"
    echo "✅ Health check passed (HTTP $response)"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Go to your website"
    echo "2. Click 'Edit with Sparti Builder'"  
    echo "3. Make some changes"
    echo "4. Click 'Save' - should now work!"
    echo ""
    echo "📁 Content will be saved to:"
    echo "   - public/content/home.json"
    echo "   - public/content/versions/home.json"
else
    echo "❌ Content server not responding (HTTP $response)"
    echo "❌ Save functionality will not work"
    echo ""
    echo "🔧 Try:"
    echo "1. Run: ./start-content-server.sh"
    echo "2. Check for any error messages"
    echo "3. Verify port 3001 is available"
fi