#!/bin/bash

# EstateFlow Deployment Script
echo "🚀 EstateFlow Deployment Script"
echo "================================"

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
read -p "Enter commit message: " commit_message
git commit -m "$commit_message"

# Check if remote exists
if ! git remote | grep -q 'origin'; then
    echo "🔗 Adding remote repository..."
    read -p "Enter your GitHub repository URL: " repo_url
    git remote add origin $repo_url
fi

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://vercel.com"
echo "2. Click 'Import Project'"
echo "3. Select your GitHub repository"
echo "4. Click 'Deploy'"
echo ""
echo "🎉 Your site will be live in 2-3 minutes!"
