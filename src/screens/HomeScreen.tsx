import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import ProductCard from '@components/ProductCard';
import {COLORS, SPACING} from '@constants/theme';
import {PRICE_MULTIPLIER} from '@constants/student';
import {Watermark} from '@components/Watermark';

const PRODUCTS = [
  {
    id: '1',
    name: 'Cơm gà KTX',
    price: 2 * PRICE_MULTIPLIER,
    image: 'https://picsum.photos/seed/ktx1/500/500',
  },
  {
    id: '2',
    name: 'Mì cay hải sản',
    price: 3 * PRICE_MULTIPLIER,
    image: 'https://picsum.photos/seed/ktx2/500/500',
  },
  {
    id: '3',
    name: 'Bánh mì thịt',
    price: 1 * PRICE_MULTIPLIER,
    image: 'https://picsum.photos/seed/ktx3/500/500',
  },
  {
    id: '4',
    name: 'Trà đào',
    price: 1 * PRICE_MULTIPLIER,
    image: 'https://picsum.photos/seed/ktx4/500/500',
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>KTXGo</Text>
        <Text style={styles.subtitle}>
          Cửa hàng tiện ích KTX
        </Text>
      </View>

      <FlashList
        data={PRODUCTS}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={styles.list}
      />

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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
  },
  subtitle: {
    marginTop: SPACING.xs,
    fontSize: 14,
    color: COLORS.textLight,
  },
  list: {
    padding: SPACING.sm,
  },
});