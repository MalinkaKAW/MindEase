import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { restoreSession } from '../slices/authSlice';
import { storageService } from '../services/storageService';
import { Colors } from '../styles/theme';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { FavouritesScreen } from '../screens/FavouritesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

// Icons
import {
  Home,
  Heart,
  User,
} from 'react-native-feather';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Home Stack
const HomeStack = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colorScheme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colorScheme.card,
        },
        headerTintColor: colorScheme.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Meditation Tips',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
};

// Favourites Stack
const FavouritesStack = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colorScheme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colorScheme.card,
        },
        headerTintColor: colorScheme.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="FavouritesTab"
        component={FavouritesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Meditation Tips',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
};

// Profile Stack
const ProfileStack = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colorScheme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colorScheme.card,
        },
        headerTintColor: colorScheme.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

// App Stack with Bottom Tabs
const AppStack = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colorScheme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme.card,
          borderTopColor: colorScheme.border,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: colorScheme.primary,
        tabBarInactiveTintColor: colorScheme.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Home width={24} height={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesStack}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color }) => <Heart width={24} height={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <User width={24} height={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// Root Navigator
const RootNavigatorStack = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    (async () => {
      try {
        const user = await storageService.getUser();
        const token = await storageService.getToken();

        if (user && token) {
          dispatch(restoreSession({ user, token }));
        }
      } catch (e) {
        console.error('Failed to restore session:', e);
      }
    })();
  }, [dispatch]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIn ? (
        <Stack.Screen
          name="App"
          component={AppStack}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
        />
      )}
    </Stack.Navigator>
  );
};

// Wrap with NavigationContainer only on native
export const RootNavigator = () => {
  const isWeb = typeof window !== 'undefined';

  if (isWeb) {
    return <RootNavigatorStack />;
  }

  return (
    <NavigationContainer>
      <RootNavigatorStack />
    </NavigationContainer>
  );
};

export default RootNavigator;
