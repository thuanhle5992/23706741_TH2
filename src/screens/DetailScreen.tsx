import React from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Watermark} from '@components/Watermark';
import {STUDENT, VARIANT} from '@constants/student';
import {COLORS, RADIUS, SPACING} from '@constants/theme';
import type {ShopStackParamList} from '@navigation/ShopStack';
import {useProductsQuery} from '@services/productApi';
import {useCartStore} from '@stores/cartStore';

type DetailRouteProp = RouteProp<ShopStackParamList, 'Detail'>;

export default function DetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<DetailRouteProp>();
  const {id} = route.params;

  const {data: products = []} = useProductsQuery();
  const product = products.find(item => String(item.id) === String(id));
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

  const handleAdd = () => {
    if (!product) return;

    addItem(product);
    triggerHaptic();

    Alert.alert(
      'Đã thêm vào giỏ',
      `${STUDENT.mssv}: Đã thêm "${product.title}" vào giỏ hàng!`,
    );
  };

  if (!product) {
    return (
      <View
        style={[
          styles.container,
          {paddingTop: Math.max(insets.top, SPACING.md)},
        ]}>
        <View style={styles.navBar}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Quay lại</Text>
          </Pressable>
        </View>

        <View style={styles.notFoundCenter}>
          <Text style={styles.notFoundText}>
            Không tìm thấy thông tin món (id: {id}).
          </Text>
        </View>

        <Watermark />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {paddingTop: Math.max(insets.top, SPACING.md)},
      ]}>
      {/* Nút Back của Stack */}
      <View style={styles.navBar}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={10}>
          <Text style={styles.backButtonText}>
            ← Chi tiết món
          </Text>
        </Pressable>
        <Text style={styles.stackLabel}>Stack</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Image
            source={{uri: product.image}}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.name}>{product.title}</Text>

          <Text style={styles.price}>
            {product.price.toLocaleString('vi-VN')} đ
          </Text>

          <Text style={styles.subInfo}>
            Giao nội khu · nhận tận phòng
          </Text>

          <View style={styles.descSection}>
            <Text style={styles.descText} numberOfLines={3}>
              {product.description || 'Không có mô tả chi tiết.'}
            </Text>
            <Text style={styles.idNote}>
              Giữ nguyên id từ route.params: {id}
            </Text>
          </View>

          <Pressable style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addText}>
              Thêm vào giỏ · Haptic
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <Watermark />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },

  backButton: {
    paddingVertical: SPACING.xs,
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },

  stackLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },

  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 70,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 240,
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.md,
  },

  name: {
    marginTop: SPACING.md,
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },

  price: {
    marginTop: SPACING.xs,
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },

  subInfo: {
    marginTop: SPACING.xs,
    fontSize: 13,
    color: COLORS.textLight,
  },

  descSection: {
    marginTop: SPACING.md,
    width: '100%',
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
  },

  descText: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.text,
  },

  idNote: {
    marginTop: SPACING.xs,
    fontSize: 11,
    color: COLORS.textLight,
  },

  addButton: {
    marginTop: SPACING.lg,
    width: '100%',
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },

  addText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '800',
  },

  notFoundCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },

  notFoundText: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});