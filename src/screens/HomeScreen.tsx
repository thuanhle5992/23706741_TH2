import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ProductCard} from '@components/ProductCard';
import {Watermark} from '@components/Watermark';
import {ROOM_LABEL, STUDENT} from '@constants/student';
import {COLORS, RADIUS, SPACING} from '@constants/theme';
import {useDebouncedValue} from '@hooks/useDebouncedValue';
import type {ShopStackParamList} from '@navigation/ShopStack';
import {useProductsQuery} from '@services/productApi';
import {useCartStore} from '@stores/cartStore';

type HomeScreenProps = NativeStackScreenProps<
  ShopStackParamList,
  'Home'
>;

export function HomeScreen({navigation}: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebouncedValue(search);
  const {
    data: products = [],
    isPending,
    isError,
    refetch,
    isRefetching,
  } = useProductsQuery();

  const totalQuantity = useCartStore(state =>
    state.totalQuantity(),
  );

  const filteredProducts = useMemo(() => {
    const keyword = debouncedSearch.trim().toLowerCase();
    if (!keyword) {
      return products;
    }
    return products.filter(product =>
      product.title.toLowerCase().includes(keyword),
    );
  }, [products, debouncedSearch]);

  const handleProductPress = (id: string) => {
    navigation.navigate('Detail', {id});
  };

  const handleRetry = () => {
    refetch();
  };

  const renderProduct = ({
    item,
  }: {
    item: (typeof products)[number];
  }) => {
    return (
      <ProductCard
        product={item}
        onPress={() => handleProductPress(String(item.id))}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, SPACING.md),
        },
      ]}>
      {/* (A) Header KTXGO + Giao tận {ROOM_LABEL} */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.brand}>KTXGO</Text>
          <Text style={styles.delivery}>
            Giao tận {ROOM_LABEL}
          </Text>
        </View>

        <View style={styles.cartIconWrapper}>
          <Text style={styles.cartIcon}>🛒</Text>
          {totalQuantity > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {totalQuantity}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* (B) Ô tìm controlled theo chuỗi debounce */}
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
        placeholderTextColor={COLORS.textLight}
        style={styles.searchInput}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Ba cảnh: Đang tải / Có dữ liệu / Lỗi mạng */}
      {isPending ? (
        <View style={styles.centerState}>
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
          />
          <Text style={styles.loadingText}>
            Đang tải món...
          </Text>
        </View>
      ) : isError ? (
        <View style={styles.centerState}>
          <Text style={styles.errorStudent}>
            {STUDENT.mssv}
          </Text>
          <Text style={styles.errorText}>
            Không tải được dữ liệu món.
          </Text>
          <Pressable
            style={styles.retryButton}
            onPress={handleRetry}>
            <Text style={styles.retryButtonText}>
              Thử lại
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlashList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={item =>
              `${STUDENT.mssv}-${item.id}`
            }
            numColumns={2}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={() => {
                  refetch();
                }}
                tintColor={COLORS.primary}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Không tìm thấy món phù hợp.
                </Text>
              </View>
            }
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {/* (0) Watermark trên mọi màn hình */}
      <Watermark />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
  },

  headerLeft: {
    flex: 1,
  },

  brand: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  delivery: {
    marginTop: 2,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },

  cartIconWrapper: {
    position: 'relative',
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartIcon: {
    fontSize: 24,
  },

  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.secondary,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },

  searchInput: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    color: COLORS.dark,
    fontSize: 14,
  },

  listContainer: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: SPACING.sm,
    paddingBottom: 60,
  },

  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },

  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textLight,
    fontSize: 15,
    fontWeight: '600',
  },

  errorStudent: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.error,
    marginBottom: SPACING.xs,
  },

  errorText: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },

  retryButton: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.error,
  },

  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  emptyContainer: {
    paddingTop: 60,
    alignItems: 'center',
  },

  emptyText: {
    color: COLORS.textLight,
    fontSize: 15,
  },
});