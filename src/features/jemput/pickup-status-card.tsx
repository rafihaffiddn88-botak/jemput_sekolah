import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Spacing } from '@/constants/theme';
import type { PickupAction, PickupView } from '@/features/jemput/pickup-view';

type Props = {
  view: PickupView;
  /** Aksi yang sedang diproses. Tombol lain dikunci supaya tidak ada permintaan ganda. */
  pending: PickupAction['kind'] | null;
  onAction: (action: PickupAction) => void;
};

export function PickupStatusCard({ view, pending, onAction }: Props) {
  const primary = view.primary;
  const secondary = view.secondary;

  const renderAction = (a: PickupAction, variant: 'primary' | 'secondary') => {
    const notEnabled = a.kind === 'checkin' && !a.enabled;
    return (
      <Button
        label={a.label}
        variant={variant}
        loading={pending === a.kind}
        disabled={notEnabled || (pending !== null && pending !== a.kind)}
        onPress={() => onAction(a)}
      />
    );
  };

  const reason =
    primary && primary.kind === 'checkin' && !primary.enabled ? primary.disabledReason : undefined;

  return (
    <Card style={styles.card}>
      <StatusBadge status={view.status} />
      <AppText variant="heading">{view.headline}</AppText>
      <AppText color="textSecondary">{view.detail}</AppText>
      {view.note ? (
        <AppText variant="caption" color="textSecondary">
          {view.note}
        </AppText>
      ) : null}

      {primary || secondary ? (
        <View style={styles.actions}>
          {primary ? renderAction(primary, 'primary') : null}
          {reason ? (
            <AppText variant="caption" color="textSecondary" style={styles.center}>
              {reason}
            </AppText>
          ) : null}
          {secondary ? renderAction(secondary, 'secondary') : null}
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { gap: Spacing.two, padding: Spacing.four },
  actions: { gap: Spacing.two, marginTop: Spacing.two },
  center: { textAlign: 'center' },
});