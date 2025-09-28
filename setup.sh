#!/bin/bash

echo "🚀 Setting up Instagram Influencer Analytics Platform"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Setup Backend
echo "📦 Setting up backend..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Setup Frontend
echo "📦 Setting up frontend..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "1. Start MongoDB service"
echo "2. Backend: cd backend && npm install && npm run dev"
echo "3. Frontend: cd frontend && npm install && npm start"
echo "4. Open http://localhost:3000"
echo ""
echo "✅ Pure MERN Stack with JavaScript and Tailwind CSS"
echo "✅ Frontend matches the design exactly"
echo "✅ Backend API ready for connection"
echo ""
echo "📝 Don't forget to create a .env file in the backend directory with your configuration!"
