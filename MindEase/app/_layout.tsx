import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store, persistor } from '../src/store/store';
import { RootNavigator } from '../src/navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const isWeb = typeof window !== 'undefined';
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        {isWeb ? (
          <>
            <RootNavigator />
            <StatusBar />
          </>
        ) : (
          <PersistGate loading={null} persistor={persistor!}>
            <RootNavigator />
            <StatusBar />
          </PersistGate>
        )}
      </Provider>
    </GestureHandlerRootView>
  );
}
