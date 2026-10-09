import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import {COLORS, RADIUS, SPACING} from '@constants/theme';
import {VARIANT} from '@constants/student';
import {useCartStore} from '@stores/cartStore';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type ProductCardProps = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({
  product,
  onPress,
}: ProductCardProps) {
  const add = useCartStore(state => state.add);

  const handleAdd = () => {
    add(product);

    if (VARIANT.hapticOnAdd === 'selection') {
      Haptics.selectionAsync();
    } else {
      Haptics.impactAsync(
        Haptics.ImpactFeedbackStyle.Medium,
      );
    }
  };

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}>
      <Image
        source={{uri: product.image}}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text
          style={styles.name}
          numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            {product.price.toLocaleString('vi-VN')} đ
          </Text>

          <Pressable
            style={styles.addButton}
            onPress={handleAdd}>
            <Text style={styles.addText}>+</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  bottomRow: {
    marginTop: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: COLORS.surface,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
  },
});