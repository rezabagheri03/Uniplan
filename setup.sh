#!/bin/bash

# University Course Scheduling System - Complete Setup Script
echo "🚀 Setting up University Course Scheduling System..."
echo "===================================================="

# Check prerequisites
echo "🔍 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) is installed"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm $(npm -v) is installed"

# Check MongoDB (optional)
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB is installed"
    MONGO_AVAILABLE=true
else
    echo "⚠️  MongoDB is not installed locally. You can use Docker or cloud MongoDB."
    MONGO_AVAILABLE=false
fi

# Check Docker (optional)
if command -v docker &> /dev/null; then
    echo "✅ Docker is available"
    DOCKER_AVAILABLE=true
else
    echo "⚠️  Docker is not installed. Docker setup will be skipped."
    DOCKER_AVAILABLE=false
fi

echo ""
echo "📦 Installing dependencies..."
echo "============================="

# Create project structure
echo "📁 Creating project structure..."
mkdir -p frontend/src/{components/{common,schedule,course,reports,auth,settings},pages/{schedules,courses,api},hooks,utils,styles,types,contexts,lib}
mkdir -p backend/src/{controllers,models,routes,middleware,services,utils,types,config,tests/{unit,integration,fixtures}}
mkdir -p shared/{types,constants,validation,utils}
mkdir -p docs
mkdir -p scripts
mkdir -p docker

# Install root dependencies
echo "📦 Installing root dependencies..."
npm init -y
npm install concurrently --save-dev

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend

# Create package.json
cat > package.json << 'EOF'
{
  "name": "university-scheduling-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest --watch",
    "test:ci": "jest",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/node": "^20.4.0",
    "tailwindcss": "^3.3.0",
    "tailwindcss-rtl": "^0.9.0",
    "@tailwindcss/forms": "^0.5.0",
    "react-hook-form": "^7.45.0",
    "@hookform/resolvers": "^3.1.0",
    "yup": "^1.2.0",
    "@hello-pangea/dnd": "^16.3.0",
    "@tanstack/react-query": "^4.29.0",
    "axios": "^1.4.0",
    "moment-jalaali": "^0.9.6",
    "react-hot-toast": "^2.4.1",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.263.1",
    "@heroicons/react": "^2.0.0",
    "jspdf": "^2.5.1",
    "html2canvas": "^1.4.1",
    "exceljs": "^4.3.0",
    "file-saver": "^2.0.5",
    "qrcode": "^1.5.3",
    "recharts": "^2.7.0",
    "react-color": "^2.19.3",
    "react-select": "^5.7.0",
    "js-cookie": "^3.0.5",
    "zustand": "^4.3.0",
    "lodash": "^4.17.21",
    "classnames": "^2.3.2",
    "react-dropzone": "^14.2.0"
  },
  "devDependencies": {
    "@next/eslint-config-next": "^14.0.0",
    "eslint": "^8.45.0",
    "eslint-config-next": "^14.0.0",
    "jest": "^29.6.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.0",
    "jest-environment-jsdom": "^29.6.0",
    "@types/js-cookie": "^3.0.3",
    "@types/lodash": "^4.14.0",
    "@types/react-color": "^3.0.6",
    "@types/file-saver": "^2.0.5",
    "@types/qrcode": "^1.5.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
EOF

echo "Installing frontend packages..."
npm install

cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend

# Create package.json
cat > package.json << 'EOF'
{
  "name": "university-scheduling-backend",
  "version": "1.0.0",
  "description": "Backend API for University Course Scheduling System",
  "main": "dist/server.js",
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "seed": "ts-node src/scripts/seed.ts"
  },
  "dependencies": {
    "express": "^4.18.0",
    "typescript": "^5.0.0",
    "@types/express": "^4.17.0",
    "mongoose": "^7.4.0",
    "bcryptjs": "^2.4.3",
    "@types/bcryptjs": "^2.4.0",
    "jsonwebtoken": "^9.0.0",
    "@types/jsonwebtoken": "^9.0.0",
    "express-validator": "^7.0.1",
    "helmet": "^7.0.0",
    "cors": "^2.8.5",
    "@types/cors": "^2.8.0",
    "morgan": "^1.10.0",
    "@types/morgan": "^1.9.0",
    "compression": "^1.7.4",
    "@types/compression": "^1.7.0",
    "dotenv": "^16.3.0",
    "multer": "^1.4.5",
    "@types/multer": "^1.4.0",
    "socket.io": "^4.7.0",
    "nodemailer": "^6.9.0",
    "@types/nodemailer": "^6.4.0",
    "moment-jalaali": "^0.9.6",
    "pdfkit": "^0.13.0",
    "@types/pdfkit": "^0.12.0",
    "exceljs": "^4.3.0",
    "qrcode": "^1.5.3",
    "@types/qrcode": "^1.5.0",
    "express-rate-limit": "^6.8.0",
    "express-mongo-sanitize": "^2.2.0",
    "cookie-parser": "^1.4.6",
    "@types/cookie-parser": "^1.4.0",
    "winston": "^3.10.0",
    "joi": "^17.9.0",
    "lodash": "^4.17.21",
    "@types/lodash": "^4.14.0",
    "uuid": "^9.0.0",
    "@types/uuid": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "ts-node": "^10.9.0",
    "@types/node": "^20.4.0",
    "jest": "^29.6.0",
    "@types/jest": "^29.5.0",
    "ts-jest": "^29.1.0",
    "supertest": "^6.3.0",
    "@types/supertest": "^2.0.0",
    "eslint": "^8.45.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0"
  }
}
EOF

echo "Installing backend packages..."
npm install

cd ..

# Create environment files
echo "⚙️  Setting up environment files..."

# Backend .env
if [ ! -f backend/.env ]; then
    cat > backend/.env << 'EOF'
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/university-scheduling

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:3000

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# Logging
LOG_LEVEL=info
EOF
    echo "✅ Created backend/.env"
fi

# Frontend .env.local
if [ ! -f frontend/.env.local ]; then
    cat > frontend/.env.local << 'EOF'
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=سیستم برنامه‌ریزی دروس دانشگاهی

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_DEBUG=false
EOF
    echo "✅ Created frontend/.env.local"
fi

# Create necessary directories
echo "📁 Creating additional directories..."
mkdir -p backend/uploads
mkdir -p backend/logs
mkdir -p frontend/public/fonts

# Create Docker files
echo "🐳 Creating Docker configuration..."

# Docker Compose
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  mongodb:
    image: mongo:6.0
    container_name: scheduling-mongodb
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
      MONGO_INITDB_DATABASE: scheduling
    volumes:
      - mongodb_data:/data/db
    networks:
      - scheduling-network

  backend:
    build: 
      context: ./backend
      dockerfile: Dockerfile
    container_name: scheduling-backend
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://admin:password123@mongodb:27017/scheduling?authSource=admin
      JWT_SECRET: your-super-secret-jwt-key
      FRONTEND_URL: http://localhost:3000
    depends_on:
      - mongodb
    networks:
      - scheduling-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: scheduling-frontend
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:5000
      NEXT_PUBLIC_APP_NAME: سیستم برنامه‌ریزی دروس
    depends_on:
      - backend
    networks:
      - scheduling-network

volumes:
  mongodb_data:

networks:
  scheduling-network:
    driver: bridge
EOF

# Set permissions for scripts
chmod +x scripts/*.sh 2>/dev/null || true

echo ""
echo "🎉 Setup completed successfully!"
echo "================================"
echo ""
echo "📋 Next steps:"
echo "1. Review and update environment files:"
echo "   - backend/.env"
echo "   - frontend/.env.local"
echo ""
echo "2. Start development:"
echo "   npm run dev"
echo ""
echo "3. Or use Docker:"
echo "   docker-compose up -d"
echo ""
echo "📱 Access your application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo "   MongoDB:  mongodb://localhost:27017"
echo ""
echo "📖 For more information, see:"
echo "   - README.md"
echo "   - docs/DEVELOPMENT.md"
echo ""
echo "🚀 Happy coding!"