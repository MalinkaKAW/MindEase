import { dummyJsonClient, zenQuotesClient } from './apiClient';
import { User } from '../slices/authSlice';
import { MeditationTip } from '../slices/meditationSlice';

// Authentication Service
export const authService = {
  login: async (username: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await dummyJsonClient.post('/auth/login', {
      username,
      password,
    });

    const { id, username: uname, email, firstName, lastName, accessToken } = response.data;

    return {
      user: {
        id,
        username: uname,
        email,
        firstName,
        lastName,
      },
      token: accessToken,
    };
  },

  register: async (
    username: string,
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> => {
    // DummyJSON doesn't support registration, so we'll simulate it
    const user: User = {
      id: Math.floor(Math.random() * 1000),
      username,
      email,
      firstName: username,
    };

    return {
      user,
      token: 'mock-token-' + Date.now(),
    };
  },
};

// Meditation Tips Service
export const meditationService = {
  getMeditationTips: async (): Promise<MeditationTip[]> => {
    try {
      const response = await zenQuotesClient.get('/quotes');

      // Transform ZenQuotes response into MeditationTip format
      const tips: MeditationTip[] = response.data.slice(0, 20).map((item: any, index: number) => ({
        id: `tip-${index}`,
        quote: item.q,
        author: item.a?.replace(/,\s*$/, '') || 'Unknown',
        category: ['Mindfulness', 'Breathing', 'Calm', 'Peace', 'Wellness'][index % 5],
        level: ['Beginner', 'Intermediate', 'Advanced'][index % 3],
        icon: ['🧘', '🌿', '🌟', '💫', '🕉️'][index % 5],
      }));

      return tips;
    } catch (error) {
      console.error('Error fetching meditation tips:', error);
      // Return mock data if API fails
      return getMockMeditationTips();
    }
  },
};

// Mock data for fallback
const getMockMeditationTips = (): MeditationTip[] => {
  return [
    {
      id: 'mock-1',
      quote: 'The present moment is where life truly happens. Embrace it fully.',
      author: 'Mindfulness Master',
      category: 'Mindfulness',
      level: 'Beginner',
      icon: '🧘',
    },
    {
      id: 'mock-2',
      quote: 'Breathing is the bridge between body and mind.',
      author: 'Yoga Guru',
      category: 'Breathing',
      level: 'Beginner',
      icon: '🌿',
    },
    {
      id: 'mock-3',
      quote: 'In the stillness of your mind, you find your true power.',
      author: 'Zen Master',
      category: 'Calm',
      level: 'Intermediate',
      icon: '🌟',
    },
    {
      id: 'mock-4',
      quote: 'Every breath brings you closer to peace.',
      author: 'Wellness Coach',
      category: 'Peace',
      level: 'Intermediate',
      icon: '💫',
    },
    {
      id: 'mock-5',
      quote: 'Your mind is a garden. Meditate to plant seeds of wellness.',
      author: 'Life Coach',
      category: 'Wellness',
      level: 'Advanced',
      icon: '🕉️',
    },
  ];
};

export default { authService, meditationService };
