import { colors } from '@/constants/colors';
import React from 'react';
import {
  StyleSheet,
  TextInputProps,
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  note?: string;
  disabled?: boolean;
  check?: boolean;
  checkButtonText?: string;
  onCheck?: () => void;
}

function InputField({
  label,
  error,
  note,
  disabled,
  check = false,
  checkButtonText = '중복확인',
  onCheck,
  ...props
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <View
        style={[styles.inputContainer, check && styles.inputContainerCheck]}
      >
        <TextInput
          {...props}
          style={[styles.inputBox, check && styles.inputBoxWithCheck]}
          editable={!disabled}
        />
        {check && (
          <Pressable style={styles.checkButton} onPress={onCheck}>
            <Text style={styles.checkButtonText}>{checkButtonText}</Text>
          </Pressable>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
      {note && <Text style={styles.note}>{note}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelText: {
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerCheck: {
    gap: 8,
  },
  checkButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 16,
    minWidth: 80,
  },
  checkButtonText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.UNCHANGED_WHITE,
  },
  inputBox: {
    paddingHorizontal: 20,
    borderRadius: 5,
    height: 50,
    backgroundColor: '#F3F3F3',
    color: colors.GRAY_400,
    flex: 1,
  },
  inputBoxWithCheck: {
    flex: 1,
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
