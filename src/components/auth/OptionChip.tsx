// components/OptionChip.tsx
import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import { colors } from '@/constants/colors';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  testID?: string;
};

export default function OptionChip({
  label,
  selected = false,
  onPress,
  testID,
}: Props) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        selected ? styles.containerSelected : styles.containerDefault,
        pressed && { opacity: 0.9 },
      ]}
    >
      {selected && (
        <View style={styles.checkWrap}>
          <Feather name="check" size={14} />
        </View>
      )}
      <Text
        style={[
          styles.label,
          selected ? styles.labelSelected : styles.labelDefault,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const GREEN = colors.PRIMARY_COLOR;
const BORDER = '#D9D9D9';
const TEXT = '#282828';

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDefault: {
    backgroundColor: colors.UNCHANGED_WHITE,
    borderColor: BORDER,
  },
  containerSelected: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  checkWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.UNCHANGED_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  labelDefault: {
    color: TEXT,
  },
  labelSelected: {
    color: '#FFFFFF',
  },
});
