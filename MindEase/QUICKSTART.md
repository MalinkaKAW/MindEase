# MindEase - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd MindEase
npm install
```

### Step 2: Start the Development Server
```bash
npm start
```

### Step 3: Run the App
- **Android Emulator:** Press `a`
- **iOS Simulator:** Press `i` (macOS only)
- **Web Browser:** Press `w`
- **Mobile Device:** Scan QR code with Expo app

### Step 4: Login
Use these demo credentials:
- **Username:** `emilys`
- **Password:** `emilyspass`

---

## 📋 Feature Tour

### 1. **Home Screen** 🏠
- See meditation tips and wellness quotes
- Pull down to refresh
- Tap heart icon to add favorites
- Tap card to see details

### 2. **Details Screen** 📖
- Read full meditation tip
- **Start the breathing exercise:**
  1. Tap "▶ Start Exercise"
  2. Follow the animated circle
  3. Breathe: Inhale (4s) → Hold (4s) → Exhale (6s)
  4. Tap "⏸ Stop Exercise" when done
- Add to favorites with heart button
- See meditation tips

### 3. **Favorites Screen** ❤️
- View all saved meditation tips
- Remove items you no longer like
- All favorites are saved permanently

### 4. **Profile Screen** 👤
- See your username and email
- Check your statistics
- **Toggle Dark Mode** 🌙
  - Sun icon = Light mode
  - Moon icon = Dark mode
- Logout safely

---

## 🔑 Key Features

### ✨ Authentication
- Create an account or login
- Form validation with helpful errors
- Your login stays saved (even after closing app)

### 📱 Responsive Design
- Works on phones, tablets, and web
- Beautiful light and dark modes
- Touch-friendly buttons and navigation

### 🧘 Meditation Features
- **Guided Breathing**: Visual circle animation
- **Meditation Tips**: Curated quotes from wellness experts
- **Favorites**: Save your favorite tips
- **Dark Mode**: Easy on the eyes at night

### 🎨 User-Friendly Interface
- Clear navigation with tabs
- Simple, clean design
- Helpful empty states
- Easy access to all features

---

## 🆘 Troubleshooting

### App won't start?
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start
```

### Can't login?
- Check username: `emilys`
- Check password: `emilyspass`
- Make sure internet is connected

### Dark mode not working?
- Open Profile > Settings
- Toggle the dark mode switch
- Should apply immediately

### Breathing exercise not animating?
- Make sure you have `react-native-reanimated` installed
- Restart the app

---

## 📁 File Structure (What to Know)

```
MindEase/
├── src/screens/        # All app screens (Login, Home, Details, etc.)
├── src/store/          # Redux state management
├── src/services/       # API calls and storage
├── src/styles/         # Colors, spacing, theme
├── src/navigation/     # Navigation setup
├── App.tsx            # Main app entry point
└── README.md          # Full documentation
```

---

## 🎯 Common Tasks

### Create a New Favorite
1. Go to Home screen
2. Find a meditation tip you like
3. Tap the heart icon (❤️)
4. The heart fills in red

### View Favorites
1. Tap the Favorites tab at the bottom
2. See all your saved tips
3. Tap any card to see full details

### Change to Dark Mode
1. Tap Profile tab
2. Scroll to Settings
3. Tap the Dark Mode toggle
4. All screens instantly update

### Logout
1. Go to Profile
2. Scroll to bottom
3. Tap the red "Logout" button
4. Confirm when asked
5. Returns to login screen

### Start Breathing Exercise
1. Tap any meditation tip on Home
2. Scroll down to "🫁 Guided Breathing Exercise"
3. Tap "▶ Start Exercise"
4. Watch the circle and follow its rhythm
5. Breathe with the animation
6. Tap "⏸ Stop Exercise" when done

---

## 💡 Tips for Best Experience

1. **Use headphones** for a calming experience
2. **Find a quiet space** for meditation
3. **Practice regularly** for best results
4. **Try different categories** - find what works for you
5. **Save your favorites** - build your collection
6. **Use dark mode** at night
7. **Follow the breathing guide** carefully

---

## 🔗 Useful Links

- **Zen Quotes API:** https://zenquotes.io
- **React Navigation Docs:** https://reactnavigation.org
- **Expo Documentation:** https://docs.expo.dev
- **Redux Documentation:** https://redux.js.org

---

## 📞 Need Help?

### Check the Documentation
- `README.md` - Full documentation
- `FEATURES.md` - Detailed features list
- Code comments - Explanations in the code

### Common Issues

| Issue | Solution |
|-------|----------|
| App won't load | `npm install` then `npm start` |
| Login fails | Check demo credentials (emilys/emilyspass) |
| Favorites not saving | Check AsyncStorage permissions |
| Dark mode not persisting | Restart the app |
| API quotes not loading | Check internet connection |

---

## 🎓 Learning Resources

**Inside the App:**
- Look at `src/screens/` to understand UI
- Check `src/store/` to learn Redux
- Read `src/services/` for API calls
- See `src/styles/theme.ts` for design system

**Best Practices:**
- TypeScript for type safety
- Redux for state management
- React Navigation for routing
- Feather Icons for consistency

---

## 📈 Next Steps

1. ✅ Run the app
2. ✅ Try all features
3. ✅ Test light and dark modes
4. ✅ Try the breathing exercise
5. ✅ Add some favorites
6. ✅ Logout and login again
7. ✅ Read the full README.md

---

**Welcome to MindEase! Start your journey to better wellbeing today. 🧘‍♀️**
