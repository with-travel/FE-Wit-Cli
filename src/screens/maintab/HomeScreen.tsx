// src/screens/(tabs)/HomeScreen.tsx 등 4개 더미
import { colors } from '@/constants/colors';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <LinearGradient
        colors={colors.LINEAR_ORANGE}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Image
          source={require('@/assets/images/WitLogoWhite.png')}
          style={styles.logo}
        />
      </LinearGradient> */}
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: Dimensions.get('window').width * 0.8,
  },
  logo: {
    width: 40,
  },
});
