#!/bin/bash

echo "=== PROJECT AUDIT FOR PAYLOAD CMS INTEGRATION ==="
echo ""

echo "1. PROJECT STRUCTURE:"
echo "--------------------"
find /workspaces/the-academy-of-dance-mockup -type f -name "*.json" -o -name "*.js" -o -name "*.ts" -o -name "*.env*" | head -20

echo ""
echo "2. PACKAGE.JSON ANALYSIS:"
echo "------------------------"
if [ -f "package.json" ]; then
    echo "Found package.json"
    cat package.json | grep -A 5 -B 5 "dependencies\|scripts\|name"
else
    echo "No package.json found"
fi

echo ""
echo "3. DATABASE CONFIGURATION:"
echo "-------------------------"
# Look for database config files
find . -name "*config*" -type f | grep -E "\.(js|ts|json)$" | head -10

echo ""
echo "4. ENVIRONMENT FILES:"
echo "--------------------"
ls -la | grep -E "\.env"

echo ""
echo "5. EXISTING CMS/FRAMEWORK:"
echo "-------------------------"
# Check for common CMS/framework indicators
if [ -f "next.config.js" ] || [ -f "next.config.ts" ]; then
    echo "Next.js detected"
fi
if [ -f "nuxt.config.js" ] || [ -f "nuxt.config.ts" ]; then
    echo "Nuxt.js detected"
fi
if [ -f "gatsby-config.js" ]; then
    echo "Gatsby detected"
fi

echo ""
echo "6. DATABASE SCHEMA/MODELS:"
echo "-------------------------"
find . -name "*model*" -o -name "*schema*" -o -name "*migration*" | head -10

echo ""
echo "=== AUDIT COMPLETE ==="
