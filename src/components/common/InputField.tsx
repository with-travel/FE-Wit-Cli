import { colors } from '@/constants/colors';
import React from 'react';
import {
  StyleSheet,
  TextInputProps,
  View,
  Text,
  TextInput,
} from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

function InputField({ label, error, ...props }: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput {...props} style={styles.inputContainer} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  labelText: {
    marginBottom: 4,
  },
  inputContainer: {
    paddingHorizontal: 20,
    borderRadius: 5,
    height: 50,
    backgroundColor: '#F3F3F3',
    color: colors.GRAY_400,
  },
  error: {
    color: colors.RED_500,
  },
});

export default InputField;
