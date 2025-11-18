export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return null;
};

export const validateForm = (
  data: Record<string, string>
): Record<string, string | null> => {
  const errors: Record<string, string | null> = {};

  if (data.email) {
    if (!validateEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
  }

  if (data.password) {
    errors.password = validatePassword(data.password);
  }

  if (data.username) {
    errors.username = validateUsername(data.username);
  }

  return errors;
};
