# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port (use ENV PORT or default 5000)
ENV PORT 5000
EXPOSE 5000

# Start the server
CMD ["node", "dist/server.js"]
