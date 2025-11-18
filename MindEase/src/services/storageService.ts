import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER: '@mindease_user',
  TOKEN: '@mindease_token',
  FAVOURITES: '@mindease_favourites',
  THEME: '@mindease_theme',
};

export const storageService = {
  setUser: async (user: any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  getUser: async () => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  setToken: async (token: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  getToken: async () => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  clearAuth: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  },

  setFavourites: async (favourites: any[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FAVOURITES, JSON.stringify(favourites));
    } catch (error) {
      console.error('Error saving favourites:', error);
    }
  },

  getFavourites: async () => {
    try {
      const favourites = await AsyncStorage.getItem(STORAGE_KEYS.FAVOURITES);
      return favourites ? JSON.parse(favourites) : [];
    } catch (error) {
      console.error('Error getting favourites:', error);
      return [];
    }
  },

  setTheme: async (isDark: boolean) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(isDark));
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },

  getTheme: async () => {
    try {
      const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
      return theme ? JSON.parse(theme) : false;
    } catch (error) {
      console.error('Error getting theme:', error);
      return false;
    }
  },
};

export default storageService;
