import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { LoadingIndicator } from '@/components/ui/loading-indicator';
import { Spacing } from '@/constants/theme';

export type StateKind = 'loading' | 'empty' | 'error' | 'offline';

const DEFAULTS: Record<StateKind, { title: string; message: string }> = {
  loading: { title: 'Memuat data', message: 'Mohon tunggu sebentar.' },
  empty: { title: 'Belum ada data', message: 'Data akan muncul di sini.' },
  error: { title: 'Gagal memuat data', message: 'Terjadi kendala. Coba lagi beberapa saat lagi.' },
  offline: { title: 'Tidak ada koneksi', message: 'Periksa internet Anda, lalu coba lagi.' },
};

type StateViewProps = {
  kind: StateKind;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

/** Satu tampilan untuk kondisi memuat, kosong, gagal, dan offline. */
export function StateView({ kind, title, message, actionLabel, onAction }: StateViewProps) {
  if (kind === 'loading') {
    return <LoadingIndicator label={title ?? DEFAULTS.loading.title} />;
  }

  return (
    <View style={styles.wrap}>
      <AppText variant="title" style={styles.center} accessibilityRole="header">
        {title ?? DEFAULTS[kind].title}
      </AppText>
      <AppText color="textSecondary" style={styles.center}>
        {message ?? DEFAULTS[kind].message}
      </AppText>
      {actionLabel && onAction ? (
        <Button label={actionLabel} variant="secondary" fullWidth={false} onPress={onAction} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: Spacing.two, padding: Spacing.four },
  center: { textAlign: 'center' },
});