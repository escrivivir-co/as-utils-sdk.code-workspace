#!/bin/bash

# 🎭 Theater Oasis42 - Quick Setup Script
# Script para configurar rápidamente el sistema de tracking durante el hacklab

echo "🎭 Setting up Theater Oasis42 Mission Tracking..."

# Create necessary directories
mkdir -p theater/api

# Set permissions
chmod +x theater/api/update-progress.js

# Initialize mission state if not exists
if [ ! -f "theater/mission-state.json" ]; then
    echo "📝 Initializing mission state..."
    node theater/api/update-progress.js reset
fi

# Start local web server for the theater interface
echo "🚀 Starting theater web server..."
echo "Open http://localhost:8080 in your browser"

# Simple Python web server
cd theater
python -m http.server 8080 &
SERVER_PID=$!

echo "🎯 Theater setup complete!"
echo ""
echo "📊 Available commands:"
echo "  node api/update-progress.js team team_alpha 5 75 'Express routing,MCP integration'"
echo "  node api/update-progress.js step 3 in_progress 'Isaac learns navigation'"
echo "  node api/update-progress.js indice 'Zeus found' 'Port 3012 active' 'HyperAxe templates'"
echo "  node api/update-progress.js service zeus online"
echo "  node api/update-progress.js check"
echo "  node api/update-progress.js report"
echo ""
echo "🎬 Theater running at: http://localhost:8080"
echo "🛑 To stop: kill $SERVER_PID"

# Keep script running
trap "kill $SERVER_PID" EXIT
wait $SERVER_PID