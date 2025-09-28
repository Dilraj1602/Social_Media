#!/bin/bash

# Instagram Influencer Analytics - Server Startup Script

echo "🚀 Starting Instagram Influencer Analytics Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Function to start backend server
start_backend() {
    echo "📦 Starting Backend Server..."
    cd backend
    if [ ! -d "node_modules" ]; then
        echo "📥 Installing backend dependencies..."
        npm install
    fi
    
    # Start backend server in background
    nohup node server.js > ../backend.log 2>&1 &
    BACKEND_PID=$!
    echo "✅ Backend server started (PID: $BACKEND_PID)"
    echo "📊 Backend running on http://localhost:5001"
    echo "📋 Backend logs: backend.log"
}

# Function to start frontend server
start_frontend() {
    echo "🎨 Starting Frontend Server..."
    cd ../frontend
    if [ ! -d "node_modules" ]; then
        echo "📥 Installing frontend dependencies..."
        npm install
    fi
    
    # Start frontend server in background
    nohup npm start > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo "✅ Frontend server started (PID: $FRONTEND_PID)"
    echo "🌐 Frontend running on http://localhost:3000"
    echo "📋 Frontend logs: frontend.log"
}

# Function to check server health
check_health() {
    echo "🔍 Checking server health..."
    sleep 5
    
    # Check backend
    if curl -s http://localhost:5001/api/health > /dev/null; then
        echo "✅ Backend is healthy"
    else
        echo "❌ Backend health check failed"
    fi
    
    # Check frontend
    if curl -s http://localhost:3000 > /dev/null; then
        echo "✅ Frontend is healthy"
    else
        echo "❌ Frontend health check failed"
    fi
}

# Function to show usage instructions
show_instructions() {
    echo ""
    echo "🎉 Application Started Successfully!"
    echo ""
    echo "📱 Access the application:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:5001/api"
    echo ""
    echo "🔧 API Endpoints:"
    echo "   Health Check: http://localhost:5001/api/health"
    echo "   Influencers: http://localhost:5001/api/influencers"
    echo "   Profile: http://localhost:5001/api/influencers/ralphedwards/profile"
    echo ""
    echo "📋 Logs:"
    echo "   Backend: tail -f backend.log"
    echo "   Frontend: tail -f frontend.log"
    echo ""
    echo "🛑 To stop servers:"
    echo "   pkill -f 'node server.js'"
    echo "   pkill -f 'react-scripts start'"
    echo ""
}

# Main execution
start_backend
start_frontend
check_health
show_instructions

echo "🎯 Ready to analyze Instagram influencers!"

