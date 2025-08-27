// src/navigations/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '@/components/tab/navigation/CustomTabBar';
import HomeScreen from '@/screens/maintab/HomeScreen';
import { mainTabNavigations } from '@/constants/navigations';
import Feather from '@react-native-vector-icons/feather';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Entypo from '@react-native-vector-icons/entypo';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '@/constants/colors';
import ProfileStackNavigator from '../stack/ProfileStackNavigator';

type MainTabParamList = {
  [mainTabNavigations.HOME]: undefined;
  [mainTabNavigations.BUDDY]: undefined;
  [mainTabNavigations.CHAT]: undefined;
  [mainTabNavigations.PROFILE]: undefined;
};
const Tab = createBottomTabNavigator<MainTabParamList>();

export default function BottomTabNavigator({ navigation }: any) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { display: 'none' },
        tabBarHideOnKeyboard: true,
        sceneStyle: {
          backgroundColor: colors.UNCHANGED_WHITE,
        },
      }}
      tabBar={props => (
        <CustomTabBar
          {...props}
          onPressPlus={() => {
            console.log('Plus pressed');
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Buddies"
        component={HomeScreen}
        options={{
          tabBarLabel: '동행',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={HomeScreen}
        options={{
          tabBarLabel: '채팅',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={mainTabNavigations.PROFILE}
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: '내 정보',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
