import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Card } from '@/components/ui/card';
import { StatusBadge, STATUS_STYLE } from '@/components/ui/status-badge';
import { Radius, Sizes, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Child, PickupMethod } from '@/types/pickup';

const METHOD_LABEL: Record<PickupMethod, string> = {
  orang_tua: 'Dijemput orang tua',
  titip: 'Titip jemput',
  jemputan: 'Transportasi sekolah',
};

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

type ChildCardProps = {
  child: Child;
  onPress?: () => void;
};

export function ChildCard({ child, onPress }: ChildCardProps) {
  const theme = useTheme();
  const autoDone = child.status === 'selesai' && child.completedBy === 'otomatis';

  const summary = `${child.name}, kelas ${child.className}, ${child.gate}, ${METHOD_LABEL[child.method]}, status ${STATUS_STYLE[child.status].label}`;

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={summary}
      style={({ pressed }) => pressed && styles.pressed}>
      <Card>
        <View style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: theme.primarySoft }]}>
            <AppText variant="label" color="primary">
              {initials(child.name)}
            </AppText>
          </View>
          <View style={styles.headerText}>
            <AppText variant="title" numberOfLines={1}>
              {child.name}
            </AppText>
            <AppText variant="caption" color="textSecondary">
              Kelas {child.className}
            </AppText>
          </View>
        </View>

        <StatusBadge status={child.status} />

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <AppText variant="caption" color="textSecondary">
              Gerbang hari ini
            </AppText>
            <AppText variant="label">{child.gate}</AppText>
          </View>
          <View style={styles.infoItem}>
            <AppText variant="caption" color="textSecondary">
              Penjemputan
            </AppText>
            <AppText variant="label">{METHOD_LABEL[child.method]}</AppText>
          </View>
        </View>

        {autoDone ? (
          <AppText variant="caption" color="textSecondary">
            Ditandai selesai otomatis oleh sistem.
          </AppText>
        ) : null}
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  headerText: { flex: 1 },
  avatar: {
    width: Sizes.avatar,
    height: Sizes.avatar,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoRow: { flexDirection: 'row', gap: Spacing.three, marginTop: Spacing.one },
  infoItem: { flex: 1, gap: Spacing.half },
  pressed: { opacity: 0.85 },
});