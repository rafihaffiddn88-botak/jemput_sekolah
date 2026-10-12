import { Modal, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ConfirmDialogProps = {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel: string;
  cancelLabel: string;
  /** Saat true, kedua tombol terkunci dan dialog tidak bisa ditutup. */
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {
        if (!loading) onCancel();
      }}>
      <View style={[styles.overlay, { backgroundColor: theme.overlay }]}>
        <View
          accessibilityViewIsModal
          style={[styles.dialog, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <AppText variant="title" accessibilityRole="header">
            {title}
          </AppText>
          {message ? <AppText color="textSecondary">{message}</AppText> : null}
          <View style={styles.actions}>
            <Button label={confirmLabel} loading={loading} onPress={onConfirm} />
            <Button label={cancelLabel} variant="secondary" disabled={loading} onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  dialog: {
    width: '100%',
    maxWidth: 440,
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  actions: { gap: Spacing.two, marginTop: Spacing.two },
});