// src/components/navigation/CustomTabBar.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@react-native-vector-icons/feather';
import { colors } from '@/constants/colors';

const FAB_SIZE = 64;
const ACTIVE = '#3A3A3A';
const INACTIVE = '#9CA3AF';
const BAR_BG = '#FFFFFF';
const PLUS = colors.PRIMARY_COLOR;

type Props = BottomTabBarProps & {
  onPressPlus?: () => void;
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
  onPressPlus,
}: Props) {
  const insets = useSafeAreaInsets();
  const leftRoutes = state.routes.slice(0, 2);
  const rightRoutes = state.routes.slice(2);

  const renderItem = (route: (typeof state.routes)[number], index: number) => {
    const { options } = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? (options.tabBarLabel as string)
        : options.title !== undefined
        ? options.title
        : route.name;

    const isFocused = state.index === state.routes.indexOf(route);
    const color = isFocused ? ACTIVE : INACTIVE;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name as never);
      }
    };

    return (
      <Pressable
        key={route.key}
        onPress={onPress}
        style={styles.tabItem}
        android_ripple={{ color: '#00000010', radius: 28 }}
      >
        {options.tabBarIcon
          ? options.tabBarIcon({ focused: isFocused, color, size: 24 })
          : null}
        <Text style={[styles.label, { color }]} numberOfLines={1}>
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View pointerEvents="box-none" style={{}}>
      <View
        style={[
          styles.bar,
          {
            paddingBottom: Math.max(insets.bottom, 8),
          },
        ]}
      >
        <View style={styles.sideGroup}>{leftRoutes.map(renderItem)}</View>

        <Pressable
          onPress={onPressPlus}
          style={styles.plusButtonWrap}
          android_ripple={{ color: '#FFFFFF30', radius: 36 }}
        >
          <View style={styles.plusButton}>
            <Feather name="plus" color="#FFF" size={28} />
          </View>
        </Pressable>

        <View style={styles.sideGroup}>{rightRoutes.map(renderItem)}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BAR_BG,
    paddingHorizontal: 22,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: {
          width: 0,
          height: -2,
        },
      },
      android: {
        elevation: 8,
      },
    }),
  },
  sideGroup: {
    flexDirection: 'row',
    gap: 28,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    minWidth: 44,
  },
  label: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
  plusButtonWrap: {
    position: 'absolute',
    top: -18,
    left: '50%',
    borderRadius: 26,
  },
  plusButton: {
    width: 52,
    height: 52,
    borderRadius: 32,
    backgroundColor: PLUS,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
