import { colors } from '@/constants/colors';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Companion {
  id: number;
  title: string;
  date: Date;
  partner: string;
}

interface CompanionHeaderProps {
  hasCompanion: boolean;
  companion?: Companion;
}

function CompanionHeader({ hasCompanion, companion }: CompanionHeaderProps) {
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/WitLogoWhite.png')}
        style={styles.logo}
      />
      <View style={styles.textContainer}>
        {hasCompanion && companion ? (
          <>
            <Text style={styles.title}>예정된 동행</Text>
            <Text style={styles.subtitle}>
              {formatDate(companion.date)} {companion.partner}님과의 동행
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>나와 딱 맞는 동행 찾기</Text>
            <Text style={styles.subtitle}>
              + 버튼을 눌러 천생연분 동행을 찾아보세요!
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 52,
  },
  logo: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
  },
  textContainer: {
    marginTop: 56,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.UNCHANGED_WHITE,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.UNCHANGED_WHITE,
  },
});

export default CompanionHeader;
