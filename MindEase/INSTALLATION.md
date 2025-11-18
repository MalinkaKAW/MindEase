# MindEase Installation Guide

Complete step-by-step installation and configuration guide for MindEase.

## 📋 Prerequisites

Before installing MindEase, ensure you have:

### Required Software
1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version` (should show v16.0.0 or higher)

2. **npm** (v8 or higher)
   - Usually comes with Node.js
   - Verify: `npm --version`

3. **Git** (for version control)
   - Download: https://git-scm.com/
   - Verify: `git --version`

### Optional but Recommended
- **Expo CLI** - for easy mobile app testing
- **Android Emulator** - to test on Android
- **iOS Simulator** - to test on iOS (macOS only)
- **Expo Go App** - free app on App Store/Play Store for testing

---

## 🚀 Installation Steps

### Step 1: Clone or Download the Project

#### Option A: Clone from Git
```bash
git clone https://github.com/MalinkaKAW/MindEase.git
cd MindEase/MindEase
```

#### Option B: Extract from ZIP
```bash
# Extract the ZIP file
# Navigate to the project directory
cd MindEase
```

### Step 2: Install Node Dependencies

```bash
# Install all required packages
npm install
```

This will:
- Create a `node_modules` folder
- Install all packages from `package.json`
- Set up npm script commands

**Expected output:** "added XXX packages" without errors

### Step 3: Install Expo CLI (Recommended)

```bash
# Install Expo CLI globally
npm install -g expo-cli

# Verify installation
expo --version
```

### Step 4: Verify Installation

```bash
# Run the verification script
# On macOS/Linux:
chmod +x verify-setup.sh
./verify-setup.sh

# On Windows (PowerShell):
# Run it manually by checking:
node --version      # Should be v16+
npm --version       # Should be v8+
npm list react-native  # Should show installed
```

---

## 🎯 Starting the Application

### Method 1: Using Expo CLI (Recommended)

```bash
# Start the development server
npm start

# The terminal will show:
# > expo start
# ✓ Metro bundler ready
# ✓ Expo server running at ...
# ...
# Press a │ open Android
# Press i │ open iOS
# Press w │ open web
# Press r │ reload
# Press s │ send app URL
# Press q │ quit
```

### Method 2: Direct npm commands

```bash
# For Android
npm run android

# For iOS (macOS only)
npm run ios

# For Web browser
npm run web
```

---

## 📱 Running on Different Platforms

### Android Emulator

**Prerequisites:**
- Android Studio installed
- Android Emulator created and running

**Steps:**
```bash
npm start
# Press 'a' in the terminal
```

### iOS Simulator (macOS only)

**Prerequisites:**
- Xcode installed from App Store
- iOS Simulator running

**Steps:**
```bash
npm start
# Press 'i' in the terminal
```

### Web Browser

**Steps:**
```bash
npm start
# Press 'w' in the terminal
# Opens on http://localhost:19006
```

### Physical Device (Mobile Phone)

**Prerequisites:**
- Expo Go app installed (free on App Store/Play Store)
- Same WiFi network as development machine

**Steps:**
```bash
npm start
# Scan QR code with phone camera (iOS) or Expo app (Android)
# App opens on your device
```

---

## 🔑 Login Information

After app starts, use these credentials to login:

**Demo Account:**
- **Username:** `emilys`
- **Password:** `emilyspass`

Or create a new account:
- Tap "Don't have an account? Sign Up"
- Fill in all fields with valid data
- Account is created instantly

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory (optional):

```bash
# .env
REACT_APP_API_URL=https://dummyjson.com
REACT_APP_QUOTES_API=https://zenquotes.io/api
```

**Note:** These APIs are already configured, so `.env` is optional.

### App Configuration

Edit `app.json` to customize:

```json
{
  "expo": {
    "name": "MindEase",
    "slug": "mindease",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash-icon.png"
    },
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "Allow $(PRODUCT_NAME) to access your photos."
        }
      ]
    ]
  }
}
```

---

## 🐛 Troubleshooting

### Issue: Port Already in Use

**Error:** `Error: Address already in use ...`

**Solution:**
```bash
# Kill the process using the port
# macOS/Linux:
lsof -i :19000
kill -9 <PID>

# Windows (PowerShell):
netstat -ano | findstr :19000
taskkill /PID <PID> /F

# Or just use a different port:
expo start --tunnel
```

### Issue: node_modules Issues

**Error:** `Cannot find module 'react-native'`

**Solution:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Metro Bundler Errors

**Error:** `error: bundling failed`

**Solution:**
```bash
# Clear cache
npm start -- --reset-cache

# Or:
expo start -c
```

### Issue: React Native Reanimated Issues

**Error:** `ReferenceError: Reanimated 2 is not installed`

**Solution:**
```bash
npm install react-native-reanimated@~4.1.1
```

### Issue: Git Clone Fails

**Error:** `fatal: repository not found`

**Solution:**
```bash
# Use HTTPS instead:
git clone https://github.com/MalinkaKAW/MindEase.git

# Or with SSH key configured:
git clone git@github.com:MalinkaKAW/MindEase.git
```

### Issue: App Crashes on Startup

**Error:** Red error screen with JS error

**Solutions:**
1. Clear Metro cache: `npm start -- --reset-cache`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check console for specific errors
4. Verify all required packages are installed

### Issue: Dark Mode Not Working

**Solution:**
- Rebuild the app: `npm start -- --reset-cache`
- Clear app data on device
- Restart the app

### Issue: API Not Returning Data

**Error:** "Failed to load meditation tips"

**Solution:**
1. Check internet connection
2. Clear Redux cache: Settings > App Data
3. App uses fallback mock data automatically
4. Check API status:
   - Meditation API: https://zenquotes.io/api/quotes
   - Auth API: https://dummyjson.com/

---

## ✅ Verification Checklist

After installation, verify everything works:

- [ ] `npm start` works without errors
- [ ] App opens in emulator/browser/device
- [ ] Login screen appears
- [ ] Can login with `emilys` / `emilyspass`
- [ ] Home screen loads meditation tips
- [ ] Heart icon toggles favorites
- [ ] Can navigate to Details screen
- [ ] Breathing exercise animation works
- [ ] Can toggle dark mode in Profile
- [ ] Favorites persist after app restart
- [ ] Can logout and login again

---

## 📦 Dependencies Overview

### Core Framework
- `react-native` - Mobile UI framework
- `expo` - Managed React Native platform

### Navigation
- `@react-navigation/native` - Routing
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-navigation/stack` - Stack navigation

### State Management
- `@reduxjs/toolkit` - State management
- `react-redux` - React bindings
- `redux-persist` - State persistence

### API & Storage
- `axios` - HTTP client
- `@react-native-async-storage/async-storage` - Local storage

### UI Components
- `react-native-feather` - Icon set
- `react-native-gesture-handler` - Touch handling
- `react-native-reanimated` - Animations

### Development
- `typescript` - Type safety
- `eslint` - Code quality

---

## 🔄 Updating Dependencies

To update packages:

```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update react-native

# Update all packages (careful!)
npm update

# Or upgrade to latest versions
npm upgrade
```

---

## 📚 Additional Resources

### Official Documentation
- **React Native:** https://reactnative.dev/
- **Expo:** https://docs.expo.dev/
- **React Navigation:** https://reactnavigation.org/
- **Redux:** https://redux.js.org/

### Project Documentation
- `README.md` - Full project documentation
- `QUICKSTART.md` - 5-minute quick start
- `FEATURES.md` - Complete features list
- Source code comments - Implementation details

### Community Resources
- **Stack Overflow:** Search "react-native" or "expo"
- **Expo Forum:** https://forums.expo.dev/
- **React Native Discord:** Community support
- **GitHub Issues:** Report bugs

---

## 🎓 Learning Path

1. **Get Started:** Follow QUICKSTART.md
2. **Understand Structure:** Read the project structure section
3. **Explore Code:** Look at `src/screens/` and `src/store/`
4. **Read Docs:** Check README.md for detailed info
5. **Experiment:** Try modifying the code
6. **Build:** Create your own features

---

## 💻 Development Tips

### Hot Reload
Changes to JavaScript files auto-reload. For native code changes:

```bash
# Restart the development server
npm start -- --reset-cache
```

### Debugging

**React Native Debugger:**
1. Download: https://github.com/jhen0409/react-native-debugger
2. Open the debugger app
3. Use DevTools in the debugger

**Console Logging:**
```typescript
console.log('Debug message:', variable);
```

### Performance Testing

```bash
# Start with profiler enabled
npm start -- --dev-client
```

---

## 🚀 Next Steps

1. ✅ Complete installation steps above
2. ✅ Verify the app runs without errors
3. ✅ Read QUICKSTART.md for feature overview
4. ✅ Explore the codebase
5. ✅ Try all features
6. ✅ Consider enhancements

---

## 📞 Getting Help

If you encounter issues:

1. **Check Troubleshooting** section above
2. **Read project documentation** (README, FEATURES, etc.)
3. **Search GitHub issues** for similar problems
4. **Check package documentation** for specific packages
5. **Ask on forums** with error messages and reproduction steps

---

## ✨ Installation Complete!

Congratulations! You have successfully installed MindEase. 

**Next:** Open QUICKSTART.md to start using the app!

```bash
npm start
```

**Happy meditating! 🧘‍♀️**
