import CompanionCard from '@/components/home/CompanionCard';
import CompanionHeader from '@/components/home/CompanionHeader';
import NoCompanionCard from '@/components/home/NoCompanionCard';
import { colors } from '@/constants/colors';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MOCK_COMPANIONS = [
  {
    id: 1,
    title: '후쿠오카 여행',
    date: new Date('2025-11-15'),
    partner: '김위트',
  },
  {
    id: 2,
    title: '오사카 여행',
    date: new Date('2025-09-01'),
    partner: '이위트',
  },
  {
    id: 3,
    title: '도쿄 여행',
    date: new Date('2025-10-20'),
    partner: '박위트',
  },
];
// const MOCK_COMPANIONS: any[] = [];

export default function HomeScreen() {
  const [companions] = useState(MOCK_COMPANIONS);
  const hasCompanion = companions.length > 0;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={hasCompanion ? colors.LINEAR_BLUE : colors.LINEAR_ORANGE}
        style={[
          styles.header,
          {
            backgroundColor: hasCompanion ? colors.BLUE_500 : colors.RED_100,
          },
        ]}
      >
        <CompanionHeader
          hasCompanion={hasCompanion}
          companion={companions[0]}
        />
      </LinearGradient>
      <View style={{ height: 20 }}>
        <View style={styles.cardContainer}>
          {hasCompanion ? (
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContainer}
            >
              {companions.map(companion => (
                <CompanionCard key={companion.id} companion={companion} />
              ))}
            </ScrollView>
          ) : (
            <NoCompanionCard />
          )}
        </View>
      </View>
      <Text>sdf</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 336 + 20,
  },
  cardContainer: {
    position: 'absolute',
    top: -140,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
  },
  carouselContainer: {
    alignItems: 'center',
    position: 'relative',
  },
});
