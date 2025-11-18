import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from '../slices/authSlice';
import meditationReducer from '../slices/meditationSlice';
import favouritesReducer from '../slices/favouritesSlice';
import themeReducer from '../slices/themeSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'favourites', 'theme'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedFavouritesReducer = persistReducer(
  { ...persistConfig, key: 'favourites' },
  favouritesReducer
);
const persistedThemeReducer = persistReducer(
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

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
