# Now create Docker, Components, and deployment files
deployment_files = {}

# Docker Compose
deployment_files["docker-compose.yml"] = """version: '3.8'

services:
  # MongoDB Database
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
      - ./scripts/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    networks:
      - scheduling-network
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 30s
      timeout: 10s
      retries: 3

  # Backend API
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
      JWT_SECRET: your-super-secret-jwt-key-change-in-production
      JWT_EXPIRE: 7d
      FRONTEND_URL: http://localhost:3000
      PORT: 5000
    depends_on:
      mongodb:
        condition: service_healthy
    networks:
      - scheduling-network
    volumes:
      - backend_uploads:/app/uploads
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Frontend Application
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
      backend:
        condition: service_healthy
    networks:
      - scheduling-network

  # Redis Cache (Optional)
  redis:
    image: redis:7-alpine
    container_name: scheduling-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - scheduling-network
    command: redis-server --appendonly yes --requirepass redis_password

volumes:
  mongodb_data:
    driver: local
  backend_uploads:
    driver: local
  redis_data:
    driver: local

networks:
  scheduling-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16"""

# Frontend Dockerfile
deployment_files["frontend/Dockerfile"] = """# Multi-stage build for production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]"""

# Backend Dockerfile
deployment_files["backend/Dockerfile"] = """# Multi-stage build for production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Build the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build TypeScript
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json

# Create uploads directory
RUN mkdir -p /app/uploads && chown nodejs:nodejs /app/uploads

USER nodejs

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:5000/health || exit 1

CMD ["node", "dist/server.js"]"""

# Environment files
deployment_files["backend/.env.example"] = """# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/university-scheduling
MONGODB_TEST_URI=mongodb://localhost:27017/university-scheduling-test

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:3000

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@university-scheduling.com
FROM_NAME=University Scheduling System

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx

# Redis (Optional)
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=redis_password

# External APIs
PERSIAN_CALENDAR_API=https://api.persian-calendar.com

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret"""

deployment_files["frontend/.env.local.example"] = """# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=سیستم برنامه‌ریزی دروس دانشگاهی

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_PWA=true

# External Services
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_SENTRY_DSN=

# Development
NEXT_PUBLIC_DEBUG=false"""

# Package.json for shared types
deployment_files["shared/package.json"] = """{
  "name": "@university-scheduling/shared",
  "version": "1.0.0",
  "description": "Shared types and utilities for University Scheduling System",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "typescript": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.4.0"
  }
}"""

# Setup script
deployment_files["scripts/setup.sh"] = """#!/bin/bash

# University Course Scheduling System Setup Script
echo "🚀 Setting up University Course Scheduling System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. Docker setup will be skipped."
    DOCKER_AVAILABLE=false
else
    DOCKER_AVAILABLE=true
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install shared dependencies
echo "📦 Installing shared dependencies..."
cd shared
npm install
npm run build
cd ..

# Create environment files
echo "⚙️  Setting up environment files..."

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env (please update with your values)"
fi

if [ ! -f frontend/.env.local ]; then
    cp frontend/.env.local.example frontend/.env.local
    echo "✅ Created frontend/.env.local (please update with your values)"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p backend/uploads
mkdir -p backend/logs
mkdir -p frontend/public/fonts

# Set permissions
chmod +x scripts/*.sh

echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update environment files with your configuration"
echo "2. Start MongoDB (or use Docker)"
echo "3. Run 'npm run dev' to start development servers"
echo ""
echo "🐳 For Docker setup:"
echo "1. Run 'docker-compose up -d' to start all services"
echo ""
echo "📖 For more information, see README.md"
"""

# Deploy script
deployment_files["scripts/deploy.sh"] = """#!/bin/bash

# Production Deployment Script
echo "🚀 Deploying University Course Scheduling System..."

# Build applications
echo "🔨 Building applications..."
npm run build

# Run tests
echo "🧪 Running tests..."
npm run test

if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Deployment aborted."
    exit 1
fi

# Docker deployment
if [ "$1" = "docker" ]; then
    echo "🐳 Deploying with Docker..."
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.prod.yml build
    docker-compose -f docker-compose.prod.yml up -d
    echo "✅ Docker deployment completed"
else
    echo "📦 Manual deployment..."
    echo "Please follow your hosting provider's instructions"
fi

echo "🎉 Deployment script completed!"
"""

# Save deployment files
import json
with open('deployment_files_complete.json', 'w', encoding='utf-8') as f:
    json.dump(deployment_files, f, ensure_ascii=False, indent=2)

print("✅ فایل‌های Deployment کامل شد!")
print("=" * 60)
print("📁 Deployment Files Created:")
print("   ✓ docker-compose.yml - تنظیمات کامل Docker")
print("   ✓ Dockerfile (Frontend & Backend)")
print("   ✓ .env.example files")
print("   ✓ setup.sh - اسکریپت نصب خودکار")
print("   ✓ deploy.sh - اسکریپت استقرار")
print("   ✓ Production configs")