import { colors } from '@/constants/colors';
import React, { ReactNode } from 'react';
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: 'large' | 'medium' | 'small';
  variant?: 'filled' | 'outlined';
  inValid?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  style = null,
  textStyle = null,
  icon = null,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      disabled={inValid}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
        style,
      ]}
      {...props}
    >
      <View style={styles[size]}>
        {icon}
        <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    // width: Dimensions.get("screen").width - 32,
  },
  inValid: {
    opacity: 0.5,
  },
  filled: {
    backgroundColor: colors.PRIMARY_COLOR,
  },
  outlined: {
    borderColor: colors.PRIMARY_COLOR,
    borderWidth: 1,
  },
  filledPressed: {
    backgroundColor: colors.PRIMARY_COLOR,
    opacity: 0.8,
  },
  outlinedPressed: {
    borderColor: colors.PRIMARY_COLOR,
    borderWidth: 1,
    opacity: 0.5,
  },
  large: {
    gap: 5,
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 15 : 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  medium: {
    gap: 5,
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  small: {
    gap: 5,
    width: '25%',
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  filledText: {
    color: colors.UNCHANGED_WHITE,
  },
  outlinedText: {
    color: colors.PRIMARY_COLOR,
  },
});

export default CustomButton;
