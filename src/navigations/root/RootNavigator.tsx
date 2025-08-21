import React from 'react';
import { Text, View } from 'react-native';
import Config from 'react-native-config';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainTabNavigator from '../tab/MainTabNavigator';

function RootNavigator() {
  console.log('Config.SERVER_BASEURL', Config.SERVER_BASEURL);
  // return <AuthStackNavigator />;
  return <MainTabNavigator />;
}

export default RootNavigator;
