import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Colors, Spacing, BorderRadius, Shadows } from '../styles/theme';
import { logout } from '../slices/authSlice';
import { toggleDarkMode } from '../slices/themeSlice';
import { storageService } from '../services/storageService';
import { ChevronRight, Moon, Sun, LogOut } from 'react-native-feather';

export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const favouritesCount = useSelector((state: RootState) => state.favourites.items.length);

  const colorScheme = isDarkMode ? Colors.dark : Colors.light;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await storageService.clearAuth();
            dispatch(logout());
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colorScheme.background },
      ]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* User Profile Card */}
      <View
        style={[
          styles.profileCard,
          {
            backgroundColor: colorScheme.card,
            borderColor: colorScheme.border,
          },
        ]}
      >
        <View style={styles.profileHeader}>
          <Text style={styles.avatar}>👤</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.username, { color: colorScheme.text }]}>
              {user?.username || 'User'}
            </Text>
            <Text style={[styles.email, { color: colorScheme.textSecondary }]}>
              {user?.email || 'user@example.com'}
            </Text>
          </View>
        </View>

        {user?.firstName && (
          <View style={styles.userInfo}>
            <Text style={[styles.infoLabel, { color: colorScheme.textSecondary }]}>
              Full Name
            </Text>
            <Text style={[styles.infoValue, { color: colorScheme.text }]}>
              {user.firstName} {user.lastName || ''}
            </Text>
          </View>
        )}
      </View>

      {/* Stats */}
      <View
        style={[
          styles.statsContainer,
          {
            backgroundColor: colorScheme.card,
            borderColor: colorScheme.border,
          },
        ]}
      >
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>❤️</Text>
          <Text style={[styles.statValue, { color: colorScheme.text }]}>
            {favouritesCount}
          </Text>
          <Text style={[styles.statLabel, { color: colorScheme.textSecondary }]}>
            Favourites
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🎯</Text>
          <Text style={[styles.statValue, { color: colorScheme.text }]}>
            0
          </Text>
          <Text style={[styles.statLabel, { color: colorScheme.textSecondary }]}>
            Completed
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🔥</Text>
          <Text style={[styles.statValue, { color: colorScheme.text }]}>
            0
          </Text>
          <Text style={[styles.statLabel, { color: colorScheme.textSecondary }]}>
            Streaks
          </Text>
        </View>
      </View>

      {/* Settings */}
      <View
        style={[
          styles.settingsSection,
          {
            backgroundColor: colorScheme.card,
            borderColor: colorScheme.border,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colorScheme.text }]}>
          Settings
        </Text>

        <TouchableOpacity
          style={[
            styles.settingItem,
            { borderBottomColor: colorScheme.border },
          ]}
          onPress={handleToggleDarkMode}
        >
          <View style={styles.settingContent}>
            {isDarkMode ? (
              <Moon width={20} height={20} color={colorScheme.primary} />
            ) : (
              <Sun width={20} height={20} color={colorScheme.primary} />
            )}
            <Text style={[styles.settingLabel, { color: colorScheme.text }]}>
              Dark Mode
            </Text>
          </View>
          <Text style={[styles.settingValue, { color: colorScheme.textSecondary }]}>
            {isDarkMode ? 'ON' : 'OFF'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => Alert.alert('Info', 'Version 1.0.0')}
        >
          <View style={styles.settingContent}>
            <Text style={[styles.settingIcon, { color: colorScheme.primary }]}>
              ℹ️
            </Text>
            <Text style={[styles.settingLabel, { color: colorScheme.text }]}>
              About App
            </Text>
          </View>
          <ChevronRight width={20} height={20} color={colorScheme.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[
          styles.logoutButton,
          { backgroundColor: Colors.light.error },
        ]}
        onPress={handleLogout}
      >
        <LogOut width={20} height={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  profileCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 0,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.medium,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    fontSize: 56,
    marginRight: Spacing.lg,
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    letterSpacing: -0.5,
  },
  email: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  userInfo: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
    paddingTop: Spacing.lg,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: Spacing.sm,
    letterSpacing: 0.3,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '500',
  },
  statsContainer: {
    borderRadius: BorderRadius.xl,
    borderWidth: 0,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Shadows.medium,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  settingsSection: {
    borderRadius: BorderRadius.xl,
    borderWidth: 0,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
    ...Shadows.medium,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    letterSpacing: -0.3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  settingIcon: {
    fontSize: 20,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  logoutButton: {
    flexDirection: 'row',
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default ProfileScreen;
