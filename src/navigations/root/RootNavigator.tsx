import React from 'react';
import { Text, View } from 'react-native';
import Config from 'react-native-config';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainTabNavigator from '../tab/MainTabNavigator';
import useAuth from '@/hooks/queries/useAuth';

function RootNavigator() {
  console.log('Config.SERVER_BASEURL', Config.SERVER_BASEURL);
  const { auth } = useAuth();
  // return <AuthStackNavigator />;
  // return <MainTabNavigator />;
  return <>{auth.id ? <MainTabNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
