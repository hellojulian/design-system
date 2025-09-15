#!/bin/bash

# Simple deployment script for Storybook to GitHub Pages
echo "🚀 Building Storybook..."
npm run storybook:build

echo "📦 Deploying to GitHub Pages..."
cd storybook-static

# Initialize a temporary git repo
git init
git add .
git commit -m "Deploy Storybook to GitHub Pages"

# Force push to gh-pages branch
git remote add origin https://github.com/hellojulian/design-system.git
git push --force origin main:gh-pages

echo "✅ Deployment complete!"
echo "🌐 Your Storybook will be available at: https://hellojulian.github.io/design-system/"