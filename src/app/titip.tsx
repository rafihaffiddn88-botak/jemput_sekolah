import { AppText } from '@/components/ui/app-text';
import { Screen } from '@/components/ui/screen';
import { StateView } from '@/components/ui/state-view';

export default function TitipScreen() {
  return (
    <Screen>
      <AppText variant="heading">Titip Jemput</AppText>
      <StateView kind="empty" title="Segera hadir" message="Layar ini dibuat di langkah berikutnya." />
    </Screen>
  );
}