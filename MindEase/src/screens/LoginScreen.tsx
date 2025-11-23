import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setLoading, loginSuccess, loginFailure } from '../slices/authSlice';
import { authService } from '../services';
import { storageService } from '../services/storageService';
import { validatePassword } from '../utils/validation';
import { Colors, Spacing, BorderRadius } from '../styles/theme';

export const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colorScheme = isDarkMode ? Colors.dark : Colors.light;
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (validatePassword(password)) {
      newErrors.password = validatePassword(password) || '';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    dispatch(setLoading(true));

    try {
      const { user, token } = await authService.login(username, password);
      
      // Store credentials
      await storageService.setUser(user);
      await storageService.setToken(token);

      dispatch(loginSuccess({ user, token }));
      setIsLoading(false);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setIsLoading(false);
      dispatch(loginFailure(errorMessage));
      Alert.alert('Login Error', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Welcome Section with Background */}
        <View style={[
          styles.welcomeSection,
          { backgroundColor: isDarkMode ? '#3D3555' : '#FFF0F5' }
        ]}>
          <View style={styles.illustrationContainer}>
            <Text style={styles.illustration}>🧘‍♀️</Text>
          </View>
          <Text style={[styles.welcomeTitle, { color: colorScheme.text }]}>Welcome to</Text>
          <Text style={[styles.appName, { color: colorScheme.primary }]}>MindEase</Text>
          <Text style={[styles.tagline, { color: colorScheme.textSecondary }]}>Your Personal Meditation Companion</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, errors.username && styles.inputError]}
              placeholder="Enter your username"
              placeholderTextColor={isDarkMode ? '#8B7BA8' : '#C7B3D5'}
              value={username}
              onChangeText={setUsername}
              editable={!isLoading}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Enter your password"
              placeholderTextColor={isDarkMode ? '#8B7BA8' : '#C7B3D5'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <Text style={styles.hint}>Demo: emilys / emilyspass</Text>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Register')}
            disabled={isLoading}
          >
            <Text style={styles.linkButtonText}>Don&apos;t have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: Spacing.xxl,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxxl,
    backgroundColor: '#FFF0F5',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  illustrationContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(107, 91, 149, 0.1)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  illustration: {
    fontSize: 60,
  },
  welcomeTitle: {
    fontSize: 16,
    color: '#8B7BA8',
    fontWeight: '500',
    marginBottom: Spacing.sm,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2D2D44',
    marginBottom: Spacing.md,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    color: '#8B7BA8',
    fontWeight: '500',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
  },
  icon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.light.primary,
    marginBottom: Spacing.md,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    paddingHorizontal: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.xl,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: Spacing.md,
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    fontSize: 16,
    color: Colors.light.text,
    backgroundColor: Colors.light.card,
  },
  inputError: {
    borderColor: Colors.light.error,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 13,
    marginTop: Spacing.sm,
  },
  hint: {
    color: Colors.light.textSecondary,
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: Spacing.lg,
    lineHeight: 18,
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.lg,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.border,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    color: Colors.light.textSecondary,
    fontSize: 13,
  },
  linkButton: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  linkButtonText: {
    color: Colors.light.primary,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

export default LoginScreen;
