import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Watermark} from '@components/Watermark';
import {
  STUDENT,
  VARIANT,
  examStamp,
} from '@constants/student';
import {
  COLORS,
  RADIUS,
  SPACING,
} from '@constants/theme';
import {useCampusLocation} from '@hooks/useCampusLocation';
import {useAuthStore} from '@stores/authStore';

export default function MeScreen() {
  const insets = useSafeAreaInsets();
  const token = useAuthStore(state => state.token);
  const account = useAuthStore(state => state.account);
  const logout = useAuthStore(state => state.logout);

  const {
    status,
    distanceKm,
    shippingFee,
    requestLocation,
    openSettings,
  } = useCampusLocation();

  // Rút gọn token: ktxgo-23706741-842066 -> ktxgo-2370...842066
  const shortToken = token
    ? `${token.slice(0, 14)}...${token.slice(-6)}`
    : 'Chưa có token';

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, SPACING.md),
        },
      ]}>
      {/* Header: TÔI : LOCATION */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          TÔI : LOCATION
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Card thông tin sinh viên */}
        <View style={styles.studentCard}>
          <Text style={styles.studentName}>
            {STUDENT.hoTen}
          </Text>

          <View style={styles.rowBetween}>
            <Text style={styles.mssvText}>
              {STUDENT.mssv}
            </Text>
            <Text style={styles.stampText}>
              #{examStamp()}
            </Text>
          </View>

          {account ? (
            <Text style={styles.accountText}>
              {VARIANT.authField === 'email' ? 'Email' : 'Số ĐT'}:{' '}
              {account}
            </Text>
          ) : null}

          <View style={styles.tokenBox}>
            <Text style={styles.tokenLabel}>Token:</Text>
            <Text style={styles.tokenValue}>
              {shortToken}
            </Text>
          </View>
        </View>

        {/* Card trạng thái vị trí & phí ship */}
        <View style={styles.locationCard}>
          <Text style={styles.statusLabel}>
            Quyền: <Text style={styles.statusValue}>{status}</Text>
          </Text>

          {status === 'granted' && distanceKm !== null && shippingFee !== null ? (
            <View style={styles.grantedSection}>
              <Text style={styles.distanceText}>
                ≈ {distanceKm.toFixed(1)} km tới cổng KTX
              </Text>

              <Text style={styles.feeHeading}>
                Phí ship ước tính
              </Text>
              <Text style={styles.feeValue}>
                {shippingFee.toLocaleString('vi-VN')} đ
              </Text>
              <Text style={styles.formulaNote}>
                (Áp dụng công thức {VARIANT.shipFormula})
              </Text>
            </View>
          ) : status === 'blocked' ? (
            <View style={styles.noticeSection}>
              <Text style={styles.noticeText}>
                Quyền vị trí đã bị chặn trong Cài đặt hệ thống.
              </Text>
            </View>
          ) : (
            <View style={styles.noticeSection}>
              <Text style={styles.noticeText}>
                Vui lòng cấp quyền vị trí để ước tính khoảng cách và phí ship.
              </Text>
            </View>
          )}

          {/* Nút Lấy vị trí ước tính ship */}
          <Pressable
            style={styles.requestButton}
            onPress={requestLocation}>
            <Text style={styles.requestButtonText}>
              Lấy vị trí ước tính ship
            </Text>
          </Pressable>

          {/* Nút Mở Cài đặt khi bị blocked */}
          {status === 'blocked' && (
            <Pressable
              style={styles.settingsButton}
              onPress={openSettings}>
              <Text style={styles.settingsButtonText}>
                Mở Cài đặt (blocked)
              </Text>
            </Pressable>
          )}
        </View>

        {/* Nút Đăng xuất */}
        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>
            Đăng xuất
          </Text>
        </Pressable>
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

  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 70,
  },

  studentCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  studentName: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.text,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },

  mssvText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },

  stampText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.secondary,
  },

  accountText: {
    marginTop: SPACING.xs,
    fontSize: 13,
    color: COLORS.textLight,
  },

  tokenBox: {
    marginTop: SPACING.sm,
    padding: SPACING.sm,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },

  tokenLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
    marginRight: 6,
  },

  tokenValue: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '600',
  },

  locationCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  statusLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },

  statusValue: {
    color: COLORS.primary,
    fontWeight: '800',
  },

  grantedSection: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },

  distanceText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },

  feeHeading: {
    marginTop: SPACING.sm,
    fontSize: 13,
    color: COLORS.textLight,
  },

  feeValue: {
    marginTop: 2,
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.secondary,
  },

  formulaNote: {
    marginTop: 2,
    fontSize: 12,
    color: COLORS.textLight,
  },

  noticeSection: {
    marginTop: SPACING.sm,
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    backgroundColor: '#FEF3C7',
  },

  noticeText: {
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
  },

  requestButton: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 12,
    alignItems: 'center',
  },

  requestButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  settingsButton: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  settingsButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  logoutButton: {
    backgroundColor: COLORS.error,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
  },

  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});