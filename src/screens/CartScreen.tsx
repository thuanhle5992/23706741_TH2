import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Watermark} from '@components/Watermark';
import {
  ROOM_LABEL,
  VARIANT,
} from '@constants/student';
import {
  COLORS,
  RADIUS,
  SPACING,
} from '@constants/theme';
import {useCampusLocation} from '@hooks/useCampusLocation';
import {useCartStore} from '@stores/cartStore';
import type {CartItem} from '@stores/cartStore';

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const items = useCartStore(state => state.items);
  const changeQty = useCartStore(state => state.changeQty);
  const removeItem = useCartStore(state => state.removeItem);
  const totalAmount = useCartStore(state => state.totalAmount);

  const amount = totalAmount();
  const {status, shippingFee} = useCampusLocation();

  const renderItem = ({item}: {item: CartItem}) => (
    <View style={styles.itemCard}>
      {item.image ? (
        <Image
          source={{uri: item.image}}
          style={styles.itemImage}
          resizeMode="contain"
        />
      ) : null}

      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>
          ×{item.quantity} ·{' '}
          {(item.price * item.quantity).toLocaleString(
            'vi-VN',
          )}{' '}
          đ
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.qtyButton}
          onPress={() =>
            changeQty(item.id, item.quantity - 1)
          }
          hitSlop={6}>
          <Text style={styles.qtyText}>−</Text>
        </Pressable>

        <Text style={styles.quantityText}>
          {item.quantity}
        </Text>

        <Pressable
          style={styles.qtyButton}
          onPress={() =>
            changeQty(item.id, item.quantity + 1)
          }
          hitSlop={6}>
          <Text style={styles.qtyText}>+</Text>
        </Pressable>

        <Pressable
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}
          hitSlop={6}>
          <Text style={styles.removeText}>Xóa</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, SPACING.md),
        },
      ]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>
            Giỏ hàng đang trống
          </Text>
          <Text style={styles.emptySubtitle}>
            Hãy thêm món từ Cửa hàng.
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          <FlatList
            data={items}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          {/* Dòng phụ giao đến {ROOM_LABEL} + phí ship + tổng hàng */}
          <View style={styles.summaryBox}>
            <Text style={styles.roomLabel}>
              Giao đến {ROOM_LABEL}
            </Text>

            {status === 'granted' && shippingFee !== null ? (
              <Text style={styles.shippingText}>
                Phí ship: {shippingFee.toLocaleString('vi-VN')}{' '}
                đ (công thức {VARIANT.shipFormula})
              </Text>
            ) : (
              <Text style={styles.shippingPending}>
                Chưa ước tính phí — mở tab Tôi
              </Text>
            )}

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                Tổng hàng:
              </Text>
              <Text style={styles.totalValue}>
                {amount.toLocaleString('vi-VN')} đ
              </Text>
            </View>
          </View>
        </View>
      )}

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
    paddingBottom: SPACING.sm,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },

  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },

  listContent: {
    paddingBottom: SPACING.md,
  },

  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  itemImage: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.sm,
    backgroundColor: '#FFFFFF',
    marginRight: SPACING.sm,
  },

  itemInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },

  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },

  itemPrice: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  qtyText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 20,
  },

  quantityText: {
    minWidth: 24,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },

  removeButton: {
    marginLeft: SPACING.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FEE2E2',
    borderRadius: RADIUS.sm,
  },

  removeText: {
    color: COLORS.error,
    fontSize: 12,
    fontWeight: '700',
  },

  summaryBox: {
    marginBottom: 60,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  roomLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },

  shippingText: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.secondary,
  },

  shippingPending: {
    marginTop: 4,
    fontSize: 13,
    fontStyle: 'italic',
    color: COLORS.textLight,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },

  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },

  emptySubtitle: {
    marginTop: SPACING.xs,
    fontSize: 14,
    color: COLORS.textLight,
  },
});