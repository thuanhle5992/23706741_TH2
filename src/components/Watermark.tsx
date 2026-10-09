import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {examStamp, STUDENT, VARIANT} from '@constants/student';
import {COLORS} from '@constants/theme';

export function Watermark() {
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="none"
      style={[
        styles.container,
        VARIANT.watermarkAtTop
          ? {top: Math.max(insets.top, 6)}
          : {bottom: Math.max(insets.bottom, 6)},
      ]}>
      <View style={styles.badge}>
        <Text style={styles.text}>
          TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 0.3,
  },
});