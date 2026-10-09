import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {Watermark} from '@components/Watermark';
import {COLORS, RADIUS, SPACING} from '@constants/theme';
import {STUDENT, VARIANT} from '@constants/student';
import {useAuthStore} from '@stores/authStore';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');

  const login = useAuthStore(state => state.login);

  const handleLogin = () => {
    if (!phone.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại.');
      return;
    }

    login(phone.trim());
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.card}>
          <Text style={styles.title}>KTXGo</Text>

          <Text style={styles.subtitle}>
            Đăng nhập hệ thống KTXGo
          </Text>

          <Text style={styles.student}>
            {STUDENT.hoTen} · {STUDENT.mssv}
          </Text>

          {VARIANT.authField === 'phone' && (
            <>
              <Text style={styles.label}>
                Số điện thoại
              </Text>

              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                style={styles.input}
              />
            </>
          )}

          <Pressable
            style={styles.button}
            onPress={handleLogin}>
            <Text style={styles.buttonText}>
              Đăng nhập
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <Watermark />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.xl,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: SPACING.sm,
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },

  student: {
    marginTop: SPACING.md,
    fontSize: 13,
    color: COLORS.text,
    textAlign: 'center',
  },

  label: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.sm,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.dark,
  },

  button: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});