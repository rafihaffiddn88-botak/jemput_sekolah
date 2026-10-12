import type { PickupStatus } from '@/types/pickup';

// DATA CONTOH riwayat. Bukan data nyata dan bukan dari server.
export type HistoryItem = {
  id: string;
  date: string;
  children: string;
  gate: string;
  status: PickupStatus;
};

export const DUMMY_HISTORY: HistoryItem[] = [
  { id: 'h1', date: 'Kamis, 8 Okt', children: 'Aisyah dan Rafi', gate: 'Gerbang A (Depan)', status: 'selesai' },
  { id: 'h2', date: 'Rabu, 7 Okt', children: 'Aisyah dan Rafi', gate: 'Gerbang B (Belakang)', status: 'selesai' },
  { id: 'h3', date: 'Selasa, 6 Okt', children: 'Aisyah dan Rafi', gate: 'Gerbang A (Depan)', status: 'dibatalkan' },
];