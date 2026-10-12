import { ActivityIndicator, Pressable, StyleSheet, View, type PressableProps } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Radius, Sizes, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export type ButtonProps = Omit<PressableProps, 'children' | 'style' | 'disabled'> & {
  label: string;
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  /** Saat true, tombol tidak bisa ditekan lagi (mencegah permintaan ganda). */
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = true,
  onPress,
  accessibilityLabel,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const inactive = disabled || loading;

  const palette = {
    primary: { bg: theme.primary, fg: theme.onPrimary, border: theme.primary },
    secondary: { bg: theme.primarySoft, fg: theme.primary, border: theme.primarySoft },
    danger: { bg: theme.danger, fg: theme.onPrimary, border: theme.danger },
    ghost: { bg: 'transparent', fg: theme.primary, border: theme.border },
  }[variant];

  const colors = inactive
    ? { bg: theme.backgroundSelected, fg: theme.textSecondary, border: theme.backgroundSelected }
    : palette;

  return (
    <Pressable
      {...rest}
      disabled={inactive}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: inactive, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: size === 'md' ? Sizes.button : Sizes.buttonSmall,
          backgroundColor: colors.bg,
          borderColor: colors.border,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
        pressed && styles.pressed,
      ]}>
      <View style={styles.content}>
        {loading ? <ActivityIndicator color={colors.fg} /> : null}
        <AppText variant="button" style={{ color: colors.fg }}>
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pressed: {
    opacity: 0.85,
  },
});