import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { travelFormNavigations } from '../../constants/navigations';
import AuthTravelFormCheckScreen from '@/screens/auth/travelform/AuthTravelFormCheckScreen';
import AuthTravelFormIntroduceScreen from '@/screens/auth/travelform/AuthTravelFormIntroduceScreen';
import { colors } from '@/constants/colors';
import { SignupProgressProvider } from '@/components/providers/SignupProgressProvider';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from '@react-native-vector-icons/feather';

export type TravelFormStackParamList = {
  [travelFormNavigations.AUTH_TRAVEL_FORM_CHECK]: undefined;
  [travelFormNavigations.AUTH_TRAVEL_FORM_INTRODUCE]: undefined;
};

const TravelFormStack = createStackNavigator<TravelFormStackParamList>();

function SignupFlowStackNavigator2() {
  const navigation = useNavigation();
  return (
    <SignupProgressProvider totalSteps={2}>
      <TravelFormStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.UNCHANGED_WHITE,
          },
        }}
      >
        <TravelFormStack.Screen
          name={travelFormNavigations.AUTH_TRAVEL_FORM_CHECK}
          component={AuthTravelFormCheckScreen}
          options={{
            headerShown: true,
            headerTitle: '여행 설문',
            animation: 'none',
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <Feather
                  name="chevron-left"
                  size={24}
                  color={colors.UNCHANGED_BLACK}
                />
              </Pressable>
            ),
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
        <TravelFormStack.Screen
          name={travelFormNavigations.AUTH_TRAVEL_FORM_INTRODUCE}
          component={AuthTravelFormIntroduceScreen}
          options={{
            headerShown: true,
            headerTitle: '여행 설문',
            animation: 'none',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
      </TravelFormStack.Navigator>
    </SignupProgressProvider>
  );
}

export default SignupFlowStackNavigator2;
