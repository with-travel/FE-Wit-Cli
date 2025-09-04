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
  note?: string;
  disabled?: boolean;
}

function InputField({
  label,
  error,
  note,
  disabled,
  ...props
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        {...props}
        style={styles.inputContainer}
        editable={!disabled}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {note && <Text style={styles.note}>{note}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  note: {
    fontSize: 12,
    color: colors.PRIMARY_COLOR,
  },
});

export default InputField;
