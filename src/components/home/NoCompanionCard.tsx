import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function NoCompanionCard() {
  return (
    <View style={styles.container}>
      {/* Back Layer: Taller, darker orange */}
      <View style={styles.cardBack} />

      {/* Front Layer: Shorter, lighter peach */}
      <View style={styles.cardFront}>
        {/* Notch Shape: "Cuts" into the front layer to reveal the back */}
        <View style={styles.notch} />
        <TouchableOpacity style={styles.plusButton}>
          <LinearGradient
            colors={['rgba(255, 142, 90, 0.72)', 'rgba(255, 230, 189, 0)']}
            style={styles.glow}
          />
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  // The taller back part of the folder
  cardBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FAA86A',
    borderRadius: 16,
    zIndex: 1,
  },
  // The shorter front part, sits on top of the back
  cardFront: {
    position: 'absolute',
    width: '100%',
    height: '90%', // Shorter than the back
    bottom: 0, // Aligned to the bottom
    backgroundColor: '#FFDBC7',
    borderRadius: 16,
    overflow: 'hidden', // Crucial for the notch effect
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  // Circle positioned to create the notch cutout
  notch: {
    position: 'absolute',
    top: -30,
    right: 40,
    width: 90,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FAA86A', // Same color as the back card
    zIndex: 3,
  },
  plusButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
  },
  // The gradient view that creates the glow
  glow: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    color: 'white', // As requested
    fontSize: 28,
    fontWeight: '300',
  },
});

export default NoCompanionCard;
