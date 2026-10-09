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
import {STUDENT, VARIANT} from '@constants/student';
import {COLORS, RADIUS, SPACING} from '@constants/theme';
import {useAuthStore} from '@stores/authStore';

export default function LoginScreen() {
  const [inputValue, setInputValue] = useState('');
  const login = useAuthStore(state => state.login);

  const isEmail = VARIANT.authField === 'email';
  const fieldLabel = isEmail ? 'Email' : 'Số điện thoại';
  const placeholderText = isEmail
    ? `${STUDENT.mssv}@sv.edu.vn`
    : `09${STUDENT.mssv.slice(-8)}`;

  const handleLogin = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      Alert.alert(
        'Yêu cầu đăng nhập',
        `Vui lòng nhập ${fieldLabel.toLowerCase()} để tiếp tục.`,
      );
      return;
    }

    login(trimmed);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.card}>
          <Text style={styles.logo}>KTXGO</Text>
          <Text style={styles.subtitle}>
            Giao đồ tận phòng ký túc xá
          </Text>

          <View style={styles.studentInfoBadge}>
            <Text style={styles.studentText}>
              {STUDENT.hoTen} · {STUDENT.mssv}
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{fieldLabel}</Text>
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={placeholderText}
              placeholderTextColor={COLORS.textLight}
              keyboardType={isEmail ? 'email-address' : 'phone-pad'}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
          </View>

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Vào cửa hàng</Text>
          </Pressable>

          <Text style={styles.footerNote}>
            Auth Stack · chưa có token
          </Text>
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
    paddingHorizontal: SPACING.xl,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  logo: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.primary,
    textAlign: 'center',
    letterSpacing: 1,
  },

  subtitle: {
    marginTop: SPACING.xs,
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
  },

  studentInfoBadge: {
    marginTop: SPACING.md,
    alignSelf: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  studentText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },

  inputGroup: {
    marginTop: SPACING.xl,
  },

  label: {
    marginBottom: SPACING.xs,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.dark,
    backgroundColor: '#FFFFFF',
  },

  button: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  footerNote: {
    marginTop: SPACING.md,
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});