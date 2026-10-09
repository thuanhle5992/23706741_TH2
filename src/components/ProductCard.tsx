import React from 'react';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import {VARIANT} from '@constants/student';
import {COLORS, RADIUS, SPACING} from '@constants/theme';
import type {Product} from '@services/productApi';
import {useCartStore} from '@stores/cartStore';

export type {Product} from '@services/productApi';

type ProductCardProps = {
  product: Product;
  onPress: () => void;
};

export function ProductCard({product, onPress}: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);

  const triggerHaptic = () => {
    try {
      if (VARIANT.hapticOnAdd === 'selection') {
        Haptics.selectionAsync();
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch {
      // Bỏ qua nếu môi trường không hỗ trợ haptics
    }
  };

  const handleAdd = (e: GestureResponderEvent) => {
    e.stopPropagation?.();
    addItem(product);
    triggerHaptic();
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={{uri: product.image}}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>
          {product.price.toLocaleString('vi-VN')} đ
        </Text>

        <Pressable
          style={styles.addButton}
          onPress={handleAdd}
          hitSlop={8}>
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: SPACING.xs,
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'space-between',
  },

  image: {
    width: '100%',
    height: 120,
    marginBottom: SPACING.sm,
    backgroundColor: '#FFFFFF',
  },

  title: {
    minHeight: 38,
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },

  price: {
    flex: 1,
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  addButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primary,
  },

  addText: {
    color: COLORS.surface,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
  },
});