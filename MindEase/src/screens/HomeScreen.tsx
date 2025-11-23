import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setLoading, setTips } from '../slices/meditationSlice';
import { meditationService } from '../services';
import { Colors, Spacing, BorderRadius, Shadows } from '../styles/theme';
import { Heart } from 'react-native-feather';
import { addFavourite, removeFavourite } from '../slices/favouritesSlice';
import { images } from '../assets/images';

const MeditationCard: React.FC<{
  item: any;
  onPress: () => void;
  onFavouritePress: () => void;
  isFavourite: boolean;
  isDarkMode: boolean;
}> = ({ item, onPress, onFavouritePress, isFavourite, isDarkMode }) => {
  const colorScheme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colorScheme.card,
          borderColor: colorScheme.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.icon}>{item.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.category,
                { color: colorScheme.primary },
              ]}
              numberOfLines={1}
            >
              {item.category} • {item.level}
            </Text>
          </View>
          <TouchableOpacity onPress={onFavouritePress} style={styles.favouriteBtn}>
            <Heart
              width={20}
              height={20}
              color={isFavourite ? Colors.light.error : colorScheme.textSecondary}
              fill={isFavourite ? Colors.light.error : 'none'}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.quote,
            { color: colorScheme.text },
          ]}
          numberOfLines={3}
        >
          {item.quote}
        </Text>

        <Text
          style={[
            styles.author,
            { color: colorScheme.textSecondary },
          ]}
          numberOfLines={1}
        >
          — {item.author}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const tips = useSelector((state: RootState) => state.meditation.tips);
  const isLoading = useSelector((state: RootState) => state.meditation.isLoading);
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const user = useSelector((state: RootState) => state.auth.user);
  const [refreshing, setRefreshing] = useState(false);

  const colorScheme = isDarkMode ? Colors.dark : Colors.light;

  const loadMeditationTips = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const data = await meditationService.getMeditationTips();
      dispatch(setTips(data));
    } catch (error) {
      console.error('Failed to load meditation tips:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadMeditationTips();
  }, [loadMeditationTips]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMeditationTips();
    setRefreshing(false);
  };

  const isFavourite = (id: string) => favourites.some((fav) => fav.id === id);

  const handleFavouritePress = (item: any) => {
    if (isFavourite(item.id)) {
      dispatch(removeFavourite(item.id));
    } else {
      dispatch(addFavourite(item));
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme.background },
      ]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: colorScheme.card },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colorScheme.text }]}>
          Hello, {user?.username || 'Friend'}
        </Text>
        <Text style={[styles.headerSubtitle, { color: colorScheme.textSecondary }]}>
          ✨ Find your inner peace today
        </Text>
      </View>

      {isLoading && tips.length === 0 ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colorScheme.primary} />
          <Text style={[styles.loadingText, { color: colorScheme.text }]}>
            Loading wellness tips...
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.sectionHeaderContainer}>
            <Image
              source={images.tips}
              style={styles.sectionHeaderImage}
            />
            <Text style={[styles.sectionHeader, { color: colorScheme.text }]}>
              Wellness Tips
            </Text>
          </View>
          <FlatList
          data={tips}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MeditationCard
              item={item}
              onPress={() => navigation.navigate('Details', { tip: item })}
              onFavouritePress={() => handleFavouritePress(item)}
              isFavourite={isFavourite(item.id)}
              isDarkMode={isDarkMode}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colorScheme.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    borderBottomWidth: 0,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.7,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Spacing.lg,
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    letterSpacing: -0.3,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionHeaderImage: {
    width: 28,
    height: 28,
    marginRight: Spacing.md,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingEmoji: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  loadingText: {
    marginTop: Spacing.lg,
    fontSize: 16,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  card: {
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 0,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  cardContent: {
    padding: Spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  icon: {
    fontSize: 32,
    marginRight: Spacing.lg,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  favouriteBtn: {
    padding: Spacing.sm,
    marginLeft: 'auto',
  },
  quote: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: Spacing.md,
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  author: {
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'italic',
    opacity: 0.8,
  },
});

export default HomeScreen;
