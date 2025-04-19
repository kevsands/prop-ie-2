FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Set environment variables
ENV NODE_ENV production
ENV PORT 5000

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "dist/server.js"]
