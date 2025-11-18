#!/bin/bash

# MindEase Setup Verification Script

echo "🧘 MindEase - Setup Verification"
echo "=================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "  ✓ Node.js $NODE_VERSION found"
else
    echo "  ✗ Node.js not found. Please install from https://nodejs.org/"
    exit 1
fi

# Check npm
echo ""
echo "✓ Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "  ✓ npm $NPM_VERSION found"
else
    echo "  ✗ npm not found. Please install Node.js"
    exit 1
fi

# Check Expo CLI
echo ""
echo "✓ Checking Expo CLI..."
if command -v expo &> /dev/null; then
    EXPO_VERSION=$(expo --version)
    echo "  ✓ Expo $EXPO_VERSION found"
else
    echo "  ⚠ Expo CLI not found. Installing..."
    npm install -g expo-cli
fi

# Check dependencies
echo ""
echo "✓ Checking project dependencies..."
if [ -d "node_modules" ]; then
    echo "  ✓ node_modules directory found"
else
    echo "  ⚠ Installing dependencies..."
    npm install
fi

# Verify required packages
echo ""
echo "✓ Verifying required packages..."
REQUIRED_PACKAGES=("react-native" "expo" "@react-navigation/native" "@reduxjs/toolkit" "react-redux" "redux-persist" "axios" "react-native-feather")

for package in "${REQUIRED_PACKAGES[@]}"; do
    if grep -q "\"$package\"" package.json; then
        echo "  ✓ $package"
    else
        echo "  ✗ $package missing"
    fi
done

# Check TypeScript
echo ""
echo "✓ TypeScript configuration..."
if [ -f "tsconfig.json" ]; then
    echo "  ✓ tsconfig.json found"
else
    echo "  ✗ tsconfig.json not found"
fi

# Summary
echo ""
echo "=================================="
echo "Setup Verification Complete! ✓"
echo ""
echo "Next steps:"
echo "1. Run: npm start"
echo "2. Press 'a' for Android, 'i' for iOS, 'w' for web"
echo "3. Login with: emilys / emilyspass"
echo ""
echo "Documentation:"
echo "- README.md      - Full documentation"
echo "- QUICKSTART.md  - 5-minute quick start"
echo "- FEATURES.md    - Complete features list"
echo ""
