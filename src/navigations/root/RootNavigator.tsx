import React, { useEffect } from 'react';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import useAuth from '@/hooks/queries/useAuth';
// import SplashScreen from 'react-native-splash-screen';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import MainTabNavigator from '@/navigations/tab/MainTabNavigator';

function RootNavigator() {
  // const {isLogin, isLoginLoading} = useAuth();
  const { isLogin } = useAuth();

  // useEffect(() => {
  //   if (!isLoginLoading) {
  //     SplashScreen.hide();
  //   }
  // }, [isLoginLoading]);

  return (
    <RetryErrorBoundary>
      {isLogin ? <MainTabNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
}

export default RootNavigator;
