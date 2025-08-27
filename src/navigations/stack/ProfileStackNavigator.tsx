import { colors } from '@/constants/colors';
import { profileNavigations } from '@/constants/navigations';
import ProfileHomeScreen from '@/screens/maintab/profile/ProfileHomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

export type ProfileStackParamList = {
  [profileNavigations.PROFILE_HOME]: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.UNCHANGED_WHITE,
        },
      }}
    >
      <Stack.Screen
        name={profileNavigations.PROFILE_HOME}
        component={ProfileHomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;
