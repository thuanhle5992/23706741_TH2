import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {examStamp, STUDENT, VARIANT} from '@constants/student';

export function Watermark() {
  return (
    <View
      pointerEvents="none"
      style={[
        styles.container,
        VARIANT.watermarkAtTop
          ? styles.top
          : styles.bottom,
      ]}>
      <Text style={styles.text}>
        TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
    alignItems: 'center',
    paddingVertical: 4,
  },

  top: {
    top: 0,
  },

  bottom: {
    bottom: 0,
  },

  text: {
    fontSize: 10,
    color: '#64748B',
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});