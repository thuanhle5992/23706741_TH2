import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {COLORS, RADIUS, SPACING} from '@constants/theme';

type Product = {
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

        <Text style={styles.price}>
          {product.price.toLocaleString('vi-VN')} đ
        </Text>
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
  price: {
    marginTop: SPACING.sm,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.secondary,
  },
});