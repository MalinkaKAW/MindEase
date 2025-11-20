import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Colors, Spacing, BorderRadius, Shadows } from '../styles/theme';
import { removeFavourite } from '../slices/favouritesSlice';
import { Heart } from 'react-native-feather';

const FavouriteCard: React.FC<{
  item: any;
  onPress: () => void;
  onRemove: () => void;
  isDarkMode: boolean;
}> = ({ item, onPress, onRemove, isDarkMode }) => {
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
          <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
            <Heart
              width={20}
              height={20}
              color={Colors.light.error}
              fill={Colors.light.error}
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

export const FavouritesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const colorScheme = isDarkMode ? Colors.dark : Colors.light;

  const handleRemove = (id: string, quote: string) => {
    Alert.alert(
      'Remove Favourite',
      'Are you sure you want to remove this item from your favourites?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => {
            dispatch(removeFavourite(id));
          },
          style: 'destructive',
        },
      ]
    );
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
          { backgroundColor: colorScheme.card, borderBottomColor: colorScheme.border },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colorScheme.text }]}>
          ❤️ My Favourites
        </Text>
        <Text style={[styles.headerSubtitle, { color: colorScheme.textSecondary }]}>
          {favourites.length} {favourites.length === 1 ? 'item' : 'items'} saved
        </Text>
      </View>

      {favourites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>💭</Text>
          <Text style={[styles.emptyTitle, { color: colorScheme.text }]}>
            No Favourites Yet
          </Text>
          <Text style={[styles.emptySubtitle, { color: colorScheme.textSecondary }]}>
            Start adding meditation tips to your favorites!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FavouriteCard
              item={item}
              onPress={() => navigation.navigate('Details', { tip: item })}
              onRemove={() => handleRemove(item.id, item.quote)}
              isDarkMode={isDarkMode}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: Spacing.sm,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: Spacing.md,
    letterSpacing: -0.3,
  },
  emptySubtitle: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    lineHeight: 22,
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
    fontSize: 36,
    marginRight: Spacing.lg,
  },
  category: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  removeBtn: {
    padding: Spacing.sm,
    marginLeft: Spacing.sm,
  },
  quote: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: Spacing.md,
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  author: {
    fontSize: 13,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

export default FavouritesScreen;
