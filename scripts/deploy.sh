#!/bin/bash

# Deployment script for manual deployment
# Usage: ./scripts/deploy.sh

set -e

echo "🚀 Starting deployment process..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    echo "Please create a .env file with required environment variables."
    exit 1
fi

# Build the project
echo -e "${YELLOW}📦 Building TypeScript project...${NC}"
yarn build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Error: Build failed! dist directory not found.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully!${NC}"

# Create deployment package
echo -e "${YELLOW}📦 Creating deployment package...${NC}"
mkdir -p deploy-package
cp -r dist deploy-package/
cp -r uploads deploy-package/ 2>/dev/null || echo "Warning: uploads directory not found"
cp package.json deploy-package/
cp yarn.lock deploy-package/
cp .env deploy-package/

echo -e "${GREEN}✅ Deployment package created!${NC}"
echo -e "${YELLOW}📤 Ready to upload to FTP server${NC}"
echo ""
echo "Next steps:"
echo "1. Use FTP client (FileZilla, WinSCP, etc.)"
echo "2. Connect to: 103.29.180.47 (or thezoomit.com)"
echo "3. Upload contents of deploy-package/ to /public_html/"
echo ""
echo "Or use GitHub Actions for automatic deployment!"

