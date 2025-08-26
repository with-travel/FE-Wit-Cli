import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import NotchedCard from './NotchedCard';
import { colors } from '@/constants/colors';

interface Companion {
  id: number;
  title: string;
  date: Date;
  partner: string;
}

interface CompanionCardProps {
  companion: Companion;
}

const getDday = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

function CompanionCard({ companion }: CompanionCardProps) {
  const dDay = getDday(companion.date);

  return (
    <View style={styles.container}>
      {/* Layer 1: Back Folder */}
      <View style={styles.cardBack} />

      {/* Layer 2: White Card */}
      <View style={styles.whiteCard} />

      {/* Layer 3: Front Folder */}
      <View style={styles.cardFront}>
        <View style={styles.cardContent}>
          <Text style={styles.tripTitle}>{companion.title}</Text>
          <Text style={styles.dDay}>D - {dDay}</Text>
        </View>
      </View>
      {/* <NotchedCard
        width={Dimensions.get('window').width - 40}
        height={160 - 24}
        color="#6A89FA"
      >
        <View style={styles.cardContent}>
          <Text style={styles.tripTitle}>{companion.title}</Text>
          <Text style={styles.dDay}>D-{dDay}</Text>
        </View>
      </NotchedCard> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: Dimensions.get('window').width,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#74ACFF',
    opacity: 0.8,
    borderRadius: 16,
    zIndex: 1,
  },
  whiteCard: {
    position: 'absolute',
    width: Dimensions.get('window').width - 40 - 16,
    height: 160 - 12,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 16,
    zIndex: 2,
  },
  cardFront: {
    position: 'absolute',
    width: '100%',
    height: 160 - 24,
    bottom: 0,
    backgroundColor: '#6A89FA',
    borderRadius: 16,
    zIndex: 3,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 12,
    justifyContent: 'flex-end',
  },
  tripTitle: {
    color: colors.UNCHANGED_WHITE,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  dDay: {
    color: colors.UNCHANGED_WHITE,
    fontSize: 44,
    fontWeight: 'bold',
  },
});

export default CompanionCard;
