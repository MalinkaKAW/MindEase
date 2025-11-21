import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from '../slices/authSlice';
import meditationReducer from '../slices/meditationSlice';
import favouritesReducer from '../slices/favouritesSlice';
import themeReducer from '../slices/themeSlice';

// Check if we're running on web
const isWeb = typeof window !== 'undefined';

// Clear browser storage on web to reset auth state
if (isWeb && typeof window !== 'undefined') {
  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch (e) {
    // Ignore errors
  }
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'favourites', 'theme'],
};

const persistedAuthReducer = isWeb ? authReducer : persistReducer(persistConfig, authReducer);
const persistedFavouritesReducer = isWeb ? favouritesReducer : persistReducer(
  { ...persistConfig, key: 'favourites' },
  favouritesReducer
);
const persistedThemeReducer = isWeb ? themeReducer : persistReducer(
  { ...persistConfig, key: 'theme' },
  themeReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    meditation: meditationReducer,
    favourites: persistedFavouritesReducer,
    theme: persistedThemeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = isWeb ? null : persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
