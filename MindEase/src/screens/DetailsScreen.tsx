import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Colors, Spacing, BorderRadius, Shadows } from '../styles/theme';
import { addFavourite, removeFavourite } from '../slices/favouritesSlice';
import { Heart } from 'react-native-feather';

interface BreathingStep {
  action: string;
  duration: number;
}

const BREATHING_CYCLE: BreathingStep[] = [
  { action: 'Inhale', duration: 4 },
  { action: 'Hold', duration: 4 },
  { action: 'Exhale', duration: 6 },
];

export const DetailsScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tip } = route.params;
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const favourites = useSelector((state: RootState) => state.favourites.items);

  const [isBreathing, setIsBreathing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(BREATHING_CYCLE[0].duration);
  const breathingScale = useState(new Animated.Value(1))[0];

  const colorScheme = isDarkMode ? Colors.dark : Colors.light;
  const isFavourite = favourites.some((fav) => fav.id === tip.id);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isBreathing && timeLeft > 0) {
      interval = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isBreathing && timeLeft === 0) {
      const nextStep = (currentStep + 1) % BREATHING_CYCLE.length;
      setCurrentStep(nextStep);
      setTimeLeft(BREATHING_CYCLE[nextStep].duration);
    }

    return () => clearTimeout(interval);
  }, [isBreathing, timeLeft, currentStep]);

  useEffect(() => {
    if (isBreathing) {
      const scale =
        BREATHING_CYCLE[currentStep].action === 'Exhale' ? 0.8 : 1.2;
      Animated.timing(breathingScale, {
        toValue: scale,
        duration: BREATHING_CYCLE[currentStep].duration * 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [isBreathing, currentStep, breathingScale]);

  const handleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavourite(tip.id));
    } else {
      dispatch(addFavourite(tip));
    }
  };

  const currentAction = BREATHING_CYCLE[currentStep].action;

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colorScheme.background },
      ]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Quote Card */}
      <View
        style={[
          styles.quoteCard,
          {
            backgroundColor: colorScheme.card,
            borderColor: colorScheme.border,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.largeIcon}>{tip.icon}</Text>
          <TouchableOpacity onPress={handleFavourite} style={styles.favouriteBtn}>
            <Heart
              size={24}
              color={isFavourite ? Colors.light.error : colorScheme.textSecondary}
              fill={isFavourite ? Colors.light.error : 'none'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.badgeContainer}>
          <View
            style={[
              styles.badge,
              { backgroundColor: colorScheme.primary + '20' },
            ]}
          >
            <Text style={[styles.badgeText, { color: colorScheme.primary }]}>
              {tip.category}
            </Text>
          </View>
          <View
            style={[
              styles.badge,
              { backgroundColor: colorScheme.secondary + '20' },
            ]}
          >
            <Text style={[styles.badgeText, { color: colorScheme.secondary }]}>
              {tip.level}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.quote,
            { color: colorScheme.text },
          ]}
        >
          {tip.quote}
        </Text>

        <Text
          style={[
            styles.author,
            { color: colorScheme.textSecondary },
          ]}
        >
          — {tip.author}
        </Text>
      </View>

      {/* Breathing Exercise */}
      <View
        style={[
          styles.breathingSection,
          {
            backgroundColor: colorScheme.card,
            borderColor: colorScheme.border,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colorScheme.text }]}>
          🫁 Guided Breathing Exercise
        </Text>

        <View style={styles.breathingContainer}>
          <Animated.View
            style={[
              styles.breathingCircle,
              {
                backgroundColor: colorScheme.primary,
                transform: [{ scale: breathingScale }],
              },
            ]}
          >
            <Text style={styles.actionText}>{currentAction}</Text>
            <Text style={styles.timeText}>{timeLeft}s</Text>
          </Animated.View>
        </View>

        <Text style={[styles.instructions, { color: colorScheme.textSecondary }]}>
          Follow the breathing pattern shown above to reduce stress and anxiety.
        </Text>

        <TouchableOpacity
          style={[
            styles.breathButton,
            {
              backgroundColor: isBreathing ? Colors.light.error : colorScheme.primary,
            },
          ]}
          onPress={() => setIsBreathing(!isBreathing)}
        >
          <Text style={styles.breathButtonText}>
            {isBreathing ? '⏸ Stop Exercise' : '▶ Start Exercise'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tips */}
      <View
        style={[
          styles.tipsSection,
          {
            backgroundColor: colorScheme.card,
            borderColor: colorScheme.border,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colorScheme.text }]}>
          💡 Tips
        </Text>
        <View style={styles.tipsList}>
          <View style={styles.tipItem}>
            <Text style={[styles.tipBullet, { color: colorScheme.primary }]}>•</Text>
            <Text style={[styles.tipText, { color: colorScheme.text }]}>
              Find a quiet, comfortable place to practice
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={[styles.tipBullet, { color: colorScheme.primary }]}>•</Text>
            <Text style={[styles.tipText, { color: colorScheme.text }]}>
              Practice for at least 5-10 minutes daily
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={[styles.tipBullet, { color: colorScheme.primary }]}>•</Text>
            <Text style={[styles.tipText, { color: colorScheme.text }]}>
              Focus on your breath and let thoughts pass without judgment
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={[styles.tipBullet, { color: colorScheme.primary }]}>•</Text>
            <Text style={[styles.tipText, { color: colorScheme.text }]}>
              Consistency is key to experiencing benefits
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  quoteCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  largeIcon: {
    fontSize: 48,
  },
  favouriteBtn: {
    padding: Spacing.md,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  quote: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: Spacing.md,
    lineHeight: 28,
  },
  author: {
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  breathingSection: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: Spacing.lg,
  },
  breathingContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  breathingCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.heavy,
  },
  actionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  timeText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    marginTop: Spacing.sm,
  },
  instructions: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  breathButton: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  breathButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tipsSection: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
  },
  tipsList: {
    gap: Spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  tipBullet: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  tipText: {
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
    lineHeight: 20,
  },
});

export default DetailsScreen;
