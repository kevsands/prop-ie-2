# Prop.ie Platform Deployment Guide

## Overview
This document provides instructions for deploying the Prop.ie platform to production environments.

## Prerequisites
- Docker and Docker Compose installed
- Node.js 18.x or higher
- Git access to the repository
- MongoDB instance (or use the containerized version)
- Domain name configured with DNS

## Deployment Options

### 1. Automated Deployment (Recommended)
The platform includes a CI/CD pipeline that automatically deploys changes to production when merged to the main branch.

1. Push changes to the main branch:
   ```bash
   git push origin main
   ```

2. The GitHub Actions workflow will automatically:
   - Run tests
   - Build the frontend and backend
   - Deploy to production

3. Monitor the deployment in the GitHub Actions tab of the repository

### 2. Manual Deployment

#### Using the Deployment Script
1. Clone the repository:
   ```bash
   git clone https://github.com/kevsands/prop-ie.git
   cd prop-ie
   ```

2. Run the deployment script:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

#### Manual Docker Deployment
1. Build and start the Docker containers:
   ```bash
   cd prop-ie
   docker-compose -f docker/docker-compose.yml build
   docker-compose -f docker/docker-compose.yml up -d
   ```

2. Verify the deployment:
   ```bash
   docker-compose -f docker/docker-compose.yml ps
   ```

## Environment Configuration

### Frontend (.env.production)
```
NEXT_PUBLIC_API_URL=https://api.prop.ie
NEXT_PUBLIC_SITE_URL=https://prop.ie
```

### Backend (.env.production)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/prop-ie
JWT_SECRET=your-production-jwt-secret
JWT_EXPIRES_IN=7d
```

## SSL Configuration
For production deployments, SSL certificates should be configured:

1. Obtain SSL certificates (e.g., using Let's Encrypt)
2. Configure the certificates in your reverse proxy (Nginx, Traefik, etc.)

## Database Backup
Regular database backups are essential:

1. Set up automated MongoDB backups:
   ```bash
   mongodump --uri="mongodb://mongodb:27017/prop-ie" --out=/backup/$(date +"%Y-%m-%d")
   ```

2. Store backups securely off-site

## Monitoring
Monitor the application using:
- Docker logs
- Application logs stored in `/var/log/prop-ie/`
- MongoDB logs

## Troubleshooting
Common issues and solutions:

1. **Container fails to start**:
   - Check logs: `docker-compose -f docker/docker-compose.yml logs`
   - Verify environment variables

2. **Database connection issues**:
   - Ensure MongoDB is running: `docker-compose -f docker/docker-compose.yml ps mongodb`
   - Check connection string in environment variables

3. **Frontend cannot connect to backend**:
   - Verify API URL in frontend environment variables
   - Check network configuration in docker-compose.yml

## Rollback Procedure
If deployment fails:

1. Revert to the previous version:
   ```bash
   git checkout <previous-commit-hash>
   ./deploy.sh
   ```

2. Restore database if necessary:
   ```bash
   mongorestore --uri="mongodb://mongodb:27017/prop-ie" /backup/YYYY-MM-DD
   ```
