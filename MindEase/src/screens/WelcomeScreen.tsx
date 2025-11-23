import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors, Spacing } from '../styles/theme';

export const WelcomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Main Welcome Section */}
      <View style={styles.mainSection}>
        <View style={styles.illustrationCircle}>
          <Text style={styles.largeIllustration}>🧘‍♀️</Text>
        </View>
        
        <Text style={styles.welcomeHeading}>Welcome to MindEase</Text>
        <Text style={styles.welcomeSubheading}>
          Your Personal Meditation Companion
        </Text>
        <Text style={styles.description}>
          Find inner peace, reduce stress, and discover your best self through guided meditation and breathing exercises.
        </Text>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <FeatureCard
          icon="🎯"
          title="Guided Meditations"
          description="Personalized meditation sessions for every mood"
        />
        <FeatureCard
          icon="🫁"
          title="Breathing Exercises"
          description="Learn calming breathing techniques"
        />
        <FeatureCard
          icon="❤️"
          title="Track Progress"
          description="Save your favorite sessions and track your journey"
        />
      </View>

      {/* CTA Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7F4',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: Spacing.xl,
  },
  mainSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxxl,
    backgroundColor: '#FFF0F5',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: Spacing.xxxl,
  },
  illustrationCircle: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(107, 91, 149, 0.12)',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  largeIllustration: {
    fontSize: 70,
  },
  welcomeHeading: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2D2D44',
    marginBottom: Spacing.md,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  welcomeSubheading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B5B95',
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#8B7BA8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  featuresSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxxl,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D44',
    marginBottom: Spacing.sm,
  },
  featureDescription: {
    fontSize: 13,
    color: '#8B7BA8',
    textAlign: 'center',
    lineHeight: 18,
  },
  buttonSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  primaryButton: {
    backgroundColor: '#6B5B95',
    paddingVertical: Spacing.lg,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    shadowColor: '#6B5B95',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#6B5B95',
    paddingVertical: Spacing.lg,
    borderRadius: 50,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#6B5B95',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default WelcomeScreen;
