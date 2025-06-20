#!/bin/bash

# Deploy to Azure App Service
echo "🚀 Deploying to Azure App Service..."

# Build the application
echo "📦 Building application..."
npm run build

# Deploy to Azure
echo "☁️ Deploying to Azure..."
az webapp deployment source config-zip \
  --resource-group your-resource-group \
  --name your-app-name \
  --src build.zip

echo "✅ Deployment completed!"
echo "🌐 Your app is available at: https://your-app-name.azurewebsites.net" 