/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';
import React from 'react';
import { queryClient } from '@/api/queryClient';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
        <Toast />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
