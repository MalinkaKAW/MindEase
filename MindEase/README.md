# MindEase - Stress Management & Meditation App

A React Native mobile application built with Expo for stress management and meditation. MindEase helps users reduce stress through guided breathing exercises, meditation tips, and motivational wellness quotes.

## 📋 Project Overview

**Index Number:** 224216V  
**Domain:** Health & Wellness  
**Assignment:** IN3210 Mobile Applications Development - Assignment 2

### ✨ Features

#### Core Features
- **User Authentication**
  - Login and registration with form validation
  - Secure token-based authentication
  - Session persistence using AsyncStorage
  - User profile with email and username display

- **Home Screen (Dynamic Content)**
  - Displays meditation tips and wellness quotes from ZenQuotes API
  - Pull-to-refresh functionality
  - Beautiful card-based UI with categories and difficulty levels
  - Quick favorite buttons on each card

- **Details Screen**
  - Full meditation tip/quote display
  - **Guided Breathing Exercise** with animated circle
    - Inhale: 4 seconds
    - Hold: 4 seconds
    - Exhale: 6 seconds
  - Tips and best practices for meditation
  - Add/remove from favorites functionality

- **Favorites Management**
  - View all saved meditation tips
  - Persistent storage using Redux + redux-persist
  - Easy removal of favorites
  - Empty state with helpful messaging

- **Profile Screen**
  - User information display
  - Statistics dashboard (favorites count, completed sessions, streaks)
  - Settings including **Dark Mode Toggle** (Bonus Feature)
  - About App info
  - Logout button with confirmation

#### Navigation
- **Bottom Tab Navigation** (Home, Favorites, Profile)
- **Stack Navigation** within each tab for details view
- Smooth transitions between screens
- Context-aware headers

#### State Management
- **Redux Toolkit** for global state
- **Redux Persist** for local storage
- Separate slices for: Auth, Meditation, Favorites, Theme

#### Design & UI
- **Responsive Design** for various screen sizes
- **Feather Icons** for all iconographic elements
- **Consistent Color Scheme**
  - Light Mode: Cyan primary, Purple secondary, Pink accent
  - Dark Mode: Cyan primary with dark backgrounds
- **Smooth Shadows** and rounded corners
- **Clean Typography** with proper spacing

## 🏗️ Project Structure

```
MindEase/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.tsx          # Authentication login
│   │   ├── RegisterScreen.tsx       # User registration
│   │   ├── HomeScreen.tsx           # Meditation tips list
│   │   ├── DetailsScreen.tsx        # Breathing exercise & details
│   │   ├── FavouritesScreen.tsx     # Saved favorites
│   │   └── ProfileScreen.tsx        # User profile & settings
│   ├── navigation/
│   │   └── RootNavigator.tsx        # Navigation setup
│   ├── store/
│   │   └── store.ts                 # Redux store configuration
│   ├── slices/
│   │   ├── authSlice.ts             # Auth state
│   │   ├── meditationSlice.ts       # Meditation tips state
│   │   ├── favouritesSlice.ts       # Favorites state
│   │   └── themeSlice.ts            # Dark mode state
│   ├── services/
│   │   ├── apiClient.ts             # API configuration
│   │   ├── index.ts                 # Auth & meditation services
│   │   └── storageService.ts        # AsyncStorage operations
│   ├── utils/
│   │   └── validation.ts            # Form validation utilities
│   └── styles/
│       └── theme.ts                 # Colors, spacing, typography
├── app/
│   └── _layout.tsx                  # App entry point
├── App.tsx                          # Main app component
├── app.json                         # Expo configuration
├── package.json                     # Dependencies
└── tsconfig.json                    # TypeScript configuration
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Mobile device or emulator (Android/iOS) or web browser

### Installation Steps

1. **Navigate to project directory:**
   ```bash
   cd MindEase/MindEase
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo development server:**
   ```bash
   npm start
   ```

4. **Run on your device/emulator:**
   - **Android:** Press `a` in terminal
   - **iOS:** Press `i` in terminal (macOS only)
   - **Web:** Press `w` in terminal
   - **Mobile Device:** Scan QR code with Expo app (iOS) or camera (Android)

### Demo Credentials
- **Username:** `emilys`
- **Password:** `emilyspass`

(Default credentials for DummyJSON API testing)

## 📱 Key Technologies

### Frontend Framework
- **React Native** - Cross-platform mobile development
- **Expo** - Managed React Native platform
- **React Navigation** - Navigation library
  - `@react-navigation/native`
  - `@react-navigation/bottom-tabs`
  - `@react-navigation/stack`

### State Management
- **Redux Toolkit** - State management
- **React-Redux** - React bindings for Redux
- **Redux-Persist** - Local persistence

### API & Data
- **Axios** - HTTP client
- **ZenQuotes API** - Meditation quotes (free, no auth required)
- **DummyJSON** - User authentication & mock data

### UI & Icons
- **React Native Feather** - Feather icons
- **React Native Reanimated** - Animations (breathing exercise)
- **Gesture Handler** - Touch interactions

### Storage
- **@react-native-async-storage/async-storage** - Local data persistence
- **Expo-Secure-Store** - Secure credential storage (optional)

### Development
- **TypeScript** - Type safety
- **ESLint** - Code quality

## 🔐 Security Features

- **Form Validation**
  - Email format validation
  - Password length requirements (min 6 characters)
  - Username validation (alphanumeric + underscore)
  - Real-time error messages

- **Token Management**
  - Secure token storage after login
  - Session restoration on app launch
  - Logout with token cleanup
  - Confirmation dialogs for sensitive actions

- **Data Persistence**
  - AsyncStorage for user data
  - Redux-persist for app state
  - Selective persistence (only auth, favorites, theme)

## 🎨 UI/UX Features

### Color Palette
**Light Mode:**
- Primary: #06B6D4 (Cyan)
- Secondary: #8B5CF6 (Purple)
- Accent: #EC4899 (Pink)
- Background: #F8FAFC (Light Gray)
- Text: #1E293B (Dark Slate)

**Dark Mode:**
- Background: #0F172A (Dark Blue)
- Card: #1E293B (Slate)
- Text: #F1F5F9 (Off White)
- Borders: #334155 (Gray)

### Typography
- Headings: 20-28px, Weight 600
- Body: 14-16px, Weight 400
- Captions: 12px, Weight 400

### Spacing & Layout
- Consistent 4px base unit spacing
- Responsive padding: xs (4), sm (8), md (12), lg (16), xl (20), xxl (24)
- Border radius: 4-16px for elements
- Shadow effects for depth

### Icons
- All icons from Feather icon set
- Home, Heart, User, Sun/Moon for dark mode
- Emoji for meditation themes

## 📊 API Integration

### Authentication API (DummyJSON)
```
POST https://dummyjson.com/auth/login
{
  "username": "emilys",
  "password": "emilyspass"
}

Response:
{
  "id": number,
  "username": string,
  "email": string,
  "firstName": string,
  "lastName": string,
  "accessToken": string
}
```

### Meditation Tips API (ZenQuotes)
```
GET https://zenquotes.io/api/quotes

Response: Array of {
  "q": string (quote),
  "a": string (author)
}
```

### Fallback Data
If API fails, app displays mock meditation tips to ensure functionality.

## 🧘 Breathing Exercise Details

The guided breathing exercise on the Details screen follows a calming pattern:

1. **Inhale** - 4 seconds (expanding circle)
2. **Hold** - 4 seconds (static circle)
3. **Exhale** - 6 seconds (shrinking circle)

The cycle repeats until user stops the exercise. Visual feedback with animated circle provides visual guidance.

## 📋 Form Validations

### Registration Form
- Username: 3+ characters, alphanumeric + underscore
- Email: Valid email format (RFC)
- Password: Minimum 6 characters
- Confirm Password: Must match password field

### Login Form
- Username: Required
- Password: Required (minimum 6 characters validated)

### Real-time Feedback
- Error messages appear below each field
- Submit button disabled while validating
- Loading state during API calls

## 🌓 Dark Mode Implementation

- Toggle in Profile > Settings
- Persists using Redux + redux-persist
- Updates all screens instantly
- Respects system preferences (optional enhancement)

Colors automatically switch:
```typescript
const colorScheme = isDarkMode ? Colors.dark : Colors.light;
```

## 📦 State Management Flow

```
Redux Store
├── auth (persisted)
│   ├── user: User object
│   ├── token: Auth token
│   ├── isLoggedIn: Boolean
│   └── error: Error message
├── meditation
│   ├── tips: MeditationTip[]
│   ├── isLoading: Boolean
│   └── error: Error message
├── favourites (persisted)
│   └── items: MeditationTip[]
└── theme (persisted)
    └── isDarkMode: Boolean
```

## 🔄 Navigation Hierarchy

```
Root Navigator
├── Auth Stack (if not logged in)
│   ├── Login
│   └── Register
└── App Stack (if logged in)
    └── Bottom Tab Navigator
        ├── Home Stack
        │   ├── Home
        │   └── Details
        ├── Favorites Stack
        │   ├── Favorites
        │   └── Details
        └── Profile Stack
            └── Profile
```

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] Register new account
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (error message)
- [ ] Form validation for email, password, username
- [ ] Session persists after app close/reopen
- [ ] Logout clears session

#### Home Screen
- [ ] Meditation tips load from API
- [ ] Pull-to-refresh works
- [ ] Favorite button toggles
- [ ] Tap to open details screen

#### Details Screen
- [ ] Full quote displays
- [ ] Start/Stop breathing exercise
- [ ] Breathing circle animates properly
- [ ] Add/remove from favorites
- [ ] Back navigation works

#### Favorites Screen
- [ ] Shows all saved items
- [ ] Remove button works
- [ ] Empty state displays when no favorites
- [ ] Items persist after app close

#### Profile Screen
- [ ] User info displays
- [ ] Statistics update
- [ ] Dark mode toggle works
- [ ] All screens update with new theme
- [ ] Logout works with confirmation

#### General
- [ ] App works in light and dark modes
- [ ] All icons render correctly
- [ ] Responsive on different screen sizes
- [ ] No console errors

## 📝 Code Quality & Best Practices

### Architecture
- **Modular Components** - Reusable, single-responsibility
- **Separation of Concerns** - Screens, services, utilities, styles
- **DRY Principle** - No code duplication
- **TypeScript** - Type safety throughout

### Performance
- **Lazy Loading** - Components load on demand
- **Memoization** - useCallback for function optimization
- **Efficient Renders** - Proper dependency arrays
- **Error Handling** - Try-catch, fallback UI

### Code Style
- **Consistent Naming** - camelCase for functions, PascalCase for components
- **Comments** - Clear, meaningful comments where needed
- **Error Messages** - User-friendly error feedback
- **Proper Imports** - Organized, no unused imports

### Security
- **Validation** - Input validation on all forms
- **Error Messages** - Don't expose sensitive info
- **Token Management** - Secure storage and cleanup
- **API Safety** - Error boundaries, fallback data

## 🚀 Future Enhancements

### Potential Features
1. **Audio Guidance** - Play meditation audio with breathing exercises
2. **Notifications** - Daily meditation reminders
3. **Mood Tracker** - Track mood before/after meditation
4. **Statistics** - Track meditation history and streaks
5. **Social Sharing** - Share favorite quotes
6. **Offline Mode** - Cache tips for offline access
7. **Push Notifications** - Meditation reminders
8. **Backend Integration** - Replace mock APIs with real backend
9. **User Profiles** - Profile pictures, bio, social features
10. **Meditation Sessions** - Timed guided sessions with background music

## 📄 License

This project is created for educational purposes as part of IN3210 Mobile Applications Development assignment.

## 👨‍💻 Author

**Index Number:** 224216V  
**Created:** 2025

## 📞 Support

For issues or questions, please refer to the code comments or check the React Navigation and Redux documentation.

### Useful Resources
- [React Navigation Docs](https://reactnavigation.org/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Feather Icons](https://feathericons.com/)
- [ZenQuotes API](https://zenquotes.io/)

---

**Happy Meditating! 🧘‍♂️**

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
