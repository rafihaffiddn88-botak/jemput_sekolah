import { AppText } from '@/components/ui/app-text';
import { Screen } from '@/components/ui/screen';
import { StateView } from '@/components/ui/state-view';

export default function AnakScreen() {
  return (
    <Screen>
      <AppText variant="heading">Anak Saya</AppText>
      <StateView kind="empty" title="Segera hadir" message="Layar ini dibuat di langkah berikutnya." />
    </Screen>
  );
}