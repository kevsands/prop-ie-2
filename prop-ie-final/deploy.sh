#!/bin/bash

# Prop.ie Production Deployment Script
# This script automates the deployment of the Prop.ie platform to production

# Exit on error
set -e

echo "Starting Prop.ie deployment process..."

# Environment variables
export NODE_ENV=production

# Frontend build
echo "Building frontend..."
cd /home/ubuntu/prop-ie/frontend
npm ci
npm run build

# Backend build
echo "Building backend..."
cd /home/ubuntu/prop-ie/backend
npm ci
npm run build

# Docker build and deployment
echo "Building and deploying Docker containers..."
cd /home/ubuntu/prop-ie
docker-compose -f docker/docker-compose.yml build
docker-compose -f docker/docker-compose.yml up -d

echo "Deployment completed successfully!"
