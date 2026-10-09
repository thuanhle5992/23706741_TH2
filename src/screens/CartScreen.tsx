import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Watermark} from '@components/Watermark';
import {COLORS, RADIUS, SPACING} from '@constants/theme';
import {ROOM_LABEL} from '@constants/student';
import {useCartStore} from '@stores/cartStore';

export default function CartScreen() {
  const items = useCartStore(state => state.items);
  const changeQty = useCartStore(state => state.changeQty);
  const remove = useCartStore(state => state.remove);
  const totalQuantity = useCartStore(state => state.totalQuantity);
  const totalAmount = useCartStore(state => state.totalAmount);

  const quantity = totalQuantity();
  const amount = totalAmount();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Giỏ hàng</Text>
        <Text style={styles.room}>
          Giao tận {ROOM_LABEL}
        </Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>
            Giỏ hàng đang trống
          </Text>

          <Text style={styles.emptyText}>
            Hãy thêm món từ Cửa hàng.
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          {items.map(item => (
            <View key={item.id} style={styles.item}>
              <View style={styles.itemInfo}>
                <Text
                  style={styles.itemName}
                  numberOfLines={2}>
                  {item.name}
                </Text>

                <Text style={styles.itemPrice}>
                  {item.price.toLocaleString('vi-VN')} đ
                </Text>
              </View>

              <View style={styles.actions}>
                <Pressable
                  style={styles.qtyButton}
                  onPress={() =>
                    changeQty(
                      item.id,
                      item.quantity - 1,
                    )
                  }>
                  <Text style={styles.qtyText}>−</Text>
                </Pressable>

                <Text style={styles.quantity}>
                  {item.quantity}
                </Text>

                <Pressable
                  style={styles.qtyButton}
                  onPress={() =>
                    changeQty(
                      item.id,
                      item.quantity + 1,
                    )
                  }>
                  <Text style={styles.qtyText}>+</Text>
                </Pressable>

                <Pressable
                  style={styles.removeButton}
                  onPress={() => remove(item.id)}>
                  <Text style={styles.removeText}>
                    Xóa
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}

          <View style={styles.summary}>
            <Text style={styles.summaryLabel}>
              Số lượng
            </Text>

            <Text style={styles.summaryValue}>
              {quantity}
            </Text>

            <Text style={styles.summaryLabel}>
              Tổng tiền
            </Text>

            <Text style={styles.total}>
              {amount.toLocaleString('vi-VN')} đ
            </Text>

            <Text style={styles.delivery}>
              Phòng giao: {ROOM_LABEL}
            </Text>
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
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
  },

  room: {
    marginTop: SPACING.xs,
    fontSize: 14,
    color: COLORS.textLight,
  },

  content: {
    flex: 1,
    padding: SPACING.md,
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },

  emptyText: {
    marginTop: SPACING.sm,
    fontSize: 14,
    color: COLORS.textLight,
  },

  item: {
    marginBottom: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },

  itemPrice: {
    marginTop: SPACING.xs,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.secondary,
  },

  actions: {
    marginTop: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyText: {
    color: COLORS.surface,
    fontSize: 22,
    fontWeight: '700',
  },

  quantity: {
    minWidth: 40,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },

  removeButton: {
    marginLeft: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.error,
  },

  removeText: {
    color: COLORS.surface,
    fontWeight: '700',
  },

  summary: {
    marginTop: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  summaryLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },

  summaryValue: {
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },

  total: {
    marginTop: SPACING.xs,
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.secondary,
  },

  delivery: {
    marginTop: SPACING.md,
    fontSize: 14,
    color: COLORS.textLight,
  },
});