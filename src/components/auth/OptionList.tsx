// components/OptionList.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import OptionChip from './OptionChip';

export type OptionItem = { id?: string; value?: string; label: string };

type Props = {
  emoji?: string; // "⚡️" 처럼 표시용
  title: string; // 섹션 타이틀
  options: OptionItem[];
  selectedId?: string | null;
  onChange: (id: string | null) => void; // 같은 칩을 다시 누르면 선택 해제
};

export default function OptionList({
  emoji,
  title,
  options,
  selectedId,
  onChange,
}: Props) {
  const data = [...options];
  if (options.length % 2 !== 0) {
    data.push({ id: `dummy-${title}`, label: '' });
  }

  const renderItem = ({ item }: ListRenderItemInfo<OptionItem>) => {
    if (item.label === '') {
      return <View style={styles.col} />;
    }
    const itemId = item.value || item.id;
    const selected = itemId === selectedId;
    const onPress = () => onChange(selected ? null : itemId || null);
    return (
      <View style={styles.col}>
        <OptionChip label={item.label} selected={selected} onPress={onPress} />
      </View>
    );
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        {!!emoji && <Text style={styles.emoji}>{emoji}</Text>}
        <Text style={styles.title}>{title}</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={it => it.value || it.id || it.label}
        renderItem={renderItem}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  row: {
    justifyContent: 'space-between',
    gap: 8,
  },
  col: {
    flex: 1,
  },
});
