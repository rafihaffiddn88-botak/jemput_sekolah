import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChildCard } from '@/components/ui/child-card';
import { Chip } from '@/components/ui/chip';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Screen } from '@/components/ui/screen';
import { StatusBadge } from '@/components/ui/status-badge';
import { Radius, Spacing } from '@/constants/theme';
import { DUMMY_FAMILY, DUMMY_PARENT_NAME, DUMMY_SCHOOL } from '@/data/dummy/family';
import { DUMMY_HISTORY } from '@/data/dummy/history';
import { PickupStatusCard } from '@/features/jemput/pickup-status-card';
import {
  getPickupView,
  SCENARIO_LABEL,
  SCENARIO_ORDER,
  type PickupAction,
  type Scenario,
} from '@/features/jemput/pickup-view';
import { useTheme } from '@/hooks/use-theme';
import type { Child } from '@/types/pickup';

export default function BerandaScreen() {
  const theme = useTheme();
  const router = useRouter();

  // SIMULASI: pada versi nyata, scenario berasal dari server dan GPS.
  const [scenario, setScenario] = useState<Scenario>('sebelum_buka');
  const [pending, setPending] = useState<PickupAction['kind'] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [simulateFail, setSimulateFail] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const view = getPickupView(scenario);

  // SIMULASI permintaan ke server. Status hanya berubah setelah "server" berhasil.
  const runRequest = (kind: PickupAction['kind'], onOk: () => void, onFail: () => void) => {
    if (pending) return;
    setPending(kind);
    setBanner(null);
    timer.current = setTimeout(() => {
      setPending(null);
      if (simulateFail) onFail();
      else onOk();
    }, 1200);
  };

  const handleAction = (a: PickupAction) => {
    switch (a.kind) {
      case 'checkin':
        runRequest(
          'checkin',
          () => setScenario('antre_awal'),
          () => setBanner('Check-in gagal. Periksa koneksi, lalu coba lagi.'),
        );
        break;
      case 'cancel':
        runRequest(
          'cancel',
          () => setScenario('dibatalkan'),
          () => setBanner('Pembatalan gagal. Status antrean belum berubah.'),
        );
        break;
      case 'confirm':
        setDialogError(null);
        setDialogOpen(true);
        break;
      case 'photo':
        router.push('/kenangan');
        break;
    }
  };

  const handleConfirm = () =>
    runRequest(
      'confirm',
      () => {
        setDialogOpen(false);
        setScenario('selesai');
      },
      () => setDialogError('Tidak tersambung ke server. Status belum berubah. Coba lagi.'),
    );

  const children: Child[] = DUMMY_FAMILY.map((c) => ({
    ...c,
    status: view.status,
    completedBy:
      view.status === 'selesai' ? (scenario === 'selesai_otomatis' ? 'otomatis' : 'wali') : undefined,
  }));

  const sameGate = DUMMY_FAMILY.length > 1 && DUMMY_FAMILY.every((c) => c.gate === DUMMY_FAMILY[0].gate);

  return (
    <>
      <Screen>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <AppText variant="caption" color="textSecondary">
              {DUMMY_SCHOOL}
            </AppText>
            <AppText variant="heading">Halo, {DUMMY_PARENT_NAME}</AppText>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifikasi, 2 belum dibaca"
            style={[styles.bell, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <AppText variant="label">Notifikasi</AppText>
            <View style={[styles.badge, { backgroundColor: theme.primary }]}>
              <AppText variant="caption" style={{ color: theme.onPrimary, fontWeight: '700' }}>
                2
              </AppText>
            </View>
          </Pressable>
        </View>

        {banner ? (
          <AppText color="danger" variant="label" accessibilityRole="alert">
            {banner}
          </AppText>
        ) : null}

        <PickupStatusCard view={view} pending={pending} onAction={handleAction} />

        <View style={styles.section}>
          <AppText variant="title">Anak Anda</AppText>
          {children.map((c) => (
            <ChildCard key={c.id} child={c} />
          ))}
          {sameGate ? (
            <AppText variant="caption" color="textSecondary">
              Kakak dan adik di gerbang yang sama dipanggil bersama.
            </AppText>
          ) : null}
        </View>

        <Card>
          <AppText variant="title">Kenangan</AppText>
          <AppText color="textSecondary">
            Foto bersama anak bersifat opsional dan tidak memengaruhi penjemputan.
          </AppText>
          <Button label="Buka kamera" variant="secondary" onPress={() => router.push('/kenangan')} />
          <AppText variant="caption" color="textSecondary">
            Jangan gunakan aplikasi saat mengemudi.
          </AppText>
        </Card>

        <View style={styles.section}>
          <AppText variant="title">Riwayat terbaru</AppText>
          <Card style={styles.historyCard}>
            {DUMMY_HISTORY.map((h, i) => (
              <View
                key={h.id}
                style={[
                  styles.historyRow,
                  i < DUMMY_HISTORY.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  },
                ]}>
                <View style={styles.headerText}>
                  <AppText variant="label">{h.children}</AppText>
                  <AppText variant="caption" color="textSecondary">
                    {h.date} · {h.gate}
                  </AppText>
                </View>
                <StatusBadge status={h.status} />
              </View>
            ))}
          </Card>
        </View>

        {__DEV__ ? (
          <Card style={[styles.devCard, { borderColor: theme.warning }]}>
            <AppText variant="title">Panel simulasi (hanya pengembangan)</AppText>
            <AppText variant="caption" color="textSecondary">
              Semua status, jarak, dan nomor antrean di layar ini adalah simulasi. Belum ada GPS atau
              server yang terhubung.
            </AppText>
            <View style={styles.chips}>
              {SCENARIO_ORDER.map((s) => (
                <Chip
                  key={s}
                  label={SCENARIO_LABEL[s]}
                  selected={s === scenario}
                  onPress={() => {
                    setScenario(s);
                    setBanner(null);
                  }}
                />
              ))}
            </View>
            <Chip
              label={simulateFail ? 'Simulasi gagal jaringan: AKTIF' : 'Simulasi gagal jaringan: mati'}
              selected={simulateFail}
              onPress={() => setSimulateFail((v) => !v)}
            />
          </Card>
        ) : null}
      </Screen>

      <ConfirmDialog
        visible={dialogOpen}
        title="Apakah anak sudah bersama Anda?"
        message={dialogError ?? 'Setelah dikonfirmasi, penjemputan ditandai selesai.'}
        confirmLabel="Ya, anak sudah saya jemput"
        cancelLabel="Belum, kembali"
        loading={pending === 'confirm'}
        onConfirm={handleConfirm}
        onCancel={() => {
          if (!pending) setDialogOpen(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.three },
  headerText: { flex: 1 },
  bell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 44,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  badge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: Spacing.one,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: { gap: Spacing.two },
  historyCard: { padding: 0, gap: 0 },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
  },
  devCard: { borderStyle: 'dashed' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
});