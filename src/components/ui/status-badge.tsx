import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Radius, Spacing, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { PickupStatus } from '@/types/pickup';

type StatusStyle = { label: string; fg: ThemeColor; bg: ThemeColor };

export const STATUS_STYLE: Record<PickupStatus, StatusStyle> = {
  belum_antre: { label: 'Belum masuk antrean', fg: 'textSecondary', bg: 'backgroundElement' },
  menunggu: { label: 'Menunggu', fg: 'warning', bg: 'warningSoft' },
  diumumkan: { label: 'Sedang diumumkan', fg: 'primary', bg: 'primarySoft' },
  selesai: { label: 'Selesai', fg: 'success', bg: 'successSoft' },
  dibatalkan: { label: 'Dibatalkan', fg: 'textSecondary', bg: 'backgroundElement' },
  kedaluwarsa: { label: 'Kedaluwarsa', fg: 'textSecondary', bg: 'backgroundElement' },
  gangguan: { label: 'Gangguan pengumuman', fg: 'danger', bg: 'dangerSoft' },
};

/** Status selalu ditampilkan dengan teks, tidak hanya warna. */
export function StatusBadge({ status }: { status: PickupStatus }) {
  const theme = useTheme();
  const s = STATUS_STYLE[status];

  return (
    <View
      accessible
      accessibilityLabel={`Status: ${s.label}`}
      style={[styles.badge, { backgroundColor: theme[s.bg] }]}>
      <View style={[styles.dot, { backgroundColor: theme[s.fg] }]} />
      <AppText variant="caption" style={{ color: theme[s.fg], fontWeight: '600' }}>
        {s.label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.two,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two + Spacing.one,
    borderRadius: Radius.pill,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: Radius.pill,
  },
});