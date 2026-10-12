import type { PickupStatus } from '@/types/pickup';

export type Scenario =
  | 'sebelum_buka'
  | 'jauh'
  | 'salah_gerbang'
  | 'gps_buruk'
  | 'dalam_radius'
  | 'antre_awal'
  | 'menunggu'
  | 'diumumkan'
  | 'selesai'
  | 'selesai_otomatis'
  | 'dibatalkan'
  | 'kedaluwarsa'
  | 'gangguan';

export type PickupAction =
  | { kind: 'checkin'; label: string; enabled: boolean; disabledReason?: string }
  | { kind: 'confirm'; label: string }
  | { kind: 'cancel'; label: string }
  | { kind: 'photo'; label: string };

export type PickupView = {
  status: PickupStatus;
  headline: string;
  detail: string;
  note?: string;
  primary?: PickupAction;
  secondary?: PickupAction;
};

// KONTEKS CONTOH. Pada versi nyata, nilai ini datang dari server dan GPS.
const CTX = {
  gate: 'Gerbang B (Belakang)',
  otherGate: 'Gerbang A (Depan)',
  opensAt: '13.15',
  announceAt: '13.30',
  queueNumber: 14,
  ahead: 6,
};

export const SCENARIO_LABEL: Record<Scenario, string> = {
  sebelum_buka: 'Sebelum buka',
  jauh: 'Jauh',
  salah_gerbang: 'Salah gerbang',
  gps_buruk: 'GPS buruk',
  dalam_radius: 'Dalam radius',
  antre_awal: 'Antre awal',
  menunggu: 'Menunggu',
  diumumkan: 'Diumumkan',
  selesai: 'Selesai',
  selesai_otomatis: 'Selesai otomatis',
  dibatalkan: 'Dibatalkan',
  kedaluwarsa: 'Kedaluwarsa',
  gangguan: 'Gangguan',
};

export const SCENARIO_ORDER: Scenario[] = [
  'sebelum_buka',
  'jauh',
  'salah_gerbang',
  'gps_buruk',
  'dalam_radius',
  'antre_awal',
  'menunggu',
  'diumumkan',
  'selesai',
  'selesai_otomatis',
  'dibatalkan',
  'kedaluwarsa',
  'gangguan',
];

export function getPickupView(s: Scenario): PickupView {
  switch (s) {
    case 'sebelum_buka':
      return {
        status: 'belum_antre',
        headline: `Hari ini jemput di ${CTX.gate}`,
        detail: `Antrean dibuka pukul ${CTX.opensAt}. Pengumuman dimulai pukul ${CTX.announceAt}.`,
        primary: { kind: 'checkin', label: 'Saya sudah sampai', enabled: false, disabledReason: 'Antrean belum dibuka.' },
      };
    case 'jauh':
      return {
        status: 'belum_antre',
        headline: `Hari ini jemput di ${CTX.gate}`,
        detail: 'Anda berjarak 240 m dari gerbang. Check-in bisa dilakukan dalam radius 100 m.',
        primary: { kind: 'checkin', label: 'Saya sudah sampai', enabled: false, disabledReason: 'Terlalu jauh dari gerbang.' },
      };
    case 'salah_gerbang':
      return {
        status: 'belum_antre',
        headline: `Anda berada di ${CTX.otherGate}`,
        detail: `Anak Anda dijemput di ${CTX.gate}. Pindah ke gerbang itu untuk check-in.`,
        primary: { kind: 'checkin', label: 'Saya sudah sampai', enabled: false, disabledReason: 'Salah gerbang.' },
      };
    case 'gps_buruk':
      return {
        status: 'belum_antre',
        headline: `Hari ini jemput di ${CTX.gate}`,
        detail: 'Sinyal GPS kurang akurat. Pindah ke area terbuka, lalu coba lagi.',
        primary: { kind: 'checkin', label: 'Saya sudah sampai', enabled: false, disabledReason: 'Akurasi lokasi kurang baik.' },
      };
    case 'dalam_radius':
      return {
        status: 'belum_antre',
        headline: `Anda berada 85 m dari ${CTX.gate}`,
        detail: 'Anda sudah dalam radius check-in.',
        note: 'Tekan tombol hanya kalau Anda sudah berada di gerbang.',
        primary: { kind: 'checkin', label: 'Saya sudah sampai', enabled: true },
      };
    case 'antre_awal':
      return {
        status: 'menunggu',
        headline: 'Anda sudah masuk antrean',
        detail: `Nomor antrean ${CTX.queueNumber}. Pengumuman dimulai pukul ${CTX.announceAt}.`,
        secondary: { kind: 'cancel', label: 'Batalkan antrean' },
      };
    case 'menunggu':
      return {
        status: 'menunggu',
        headline: 'Menunggu giliran diumumkan',
        detail: `Nomor antrean ${CTX.queueNumber} di ${CTX.gate}. ${CTX.ahead} anak di depan.`,
        secondary: { kind: 'cancel', label: 'Batalkan antrean' },
      };
    case 'diumumkan':
      return {
        status: 'diumumkan',
        headline: 'Nama anak Anda sedang diumumkan',
        detail: `Temui anak di ${CTX.gate}.`,
        note: 'Satpam atau guru akan melepas anak setelah Anda terlihat.',
        primary: { kind: 'confirm', label: 'Anak sudah bersama saya' },
      };
    case 'selesai':
      return {
        status: 'selesai',
        headline: 'Penjemputan selesai',
        detail: 'Dikonfirmasi oleh Anda.',
        primary: { kind: 'photo', label: 'Ambil foto bersama anak' },
      };
    case 'selesai_otomatis':
      return {
        status: 'selesai',
        headline: 'Penjemputan selesai',
        detail: 'Ditandai selesai otomatis oleh sistem, 15 menit setelah diumumkan.',
        primary: { kind: 'photo', label: 'Ambil foto bersama anak' },
      };
    case 'dibatalkan':
      return {
        status: 'dibatalkan',
        headline: 'Antrean dibatalkan',
        detail: 'Anda membatalkan sebelum diumumkan.',
        primary: { kind: 'checkin', label: 'Check-in lagi', enabled: true },
      };
    case 'kedaluwarsa':
      return {
        status: 'kedaluwarsa',
        headline: 'Permintaan kedaluwarsa',
        detail: 'Permintaan terlalu lama tidak diproses. Check-in lagi kalau Anda masih di gerbang.',
        primary: { kind: 'checkin', label: 'Check-in lagi', enabled: true },
      };
    case 'gangguan':
      return {
        status: 'gangguan',
        headline: 'Pengumuman sedang terganggu',
        detail: `Perangkat pengumuman di ${CTX.gate} tidak merespons. Datang ke gerbang dan temui petugas.`,
        note: 'Antrean Anda tetap tersimpan.',
      };
  }
}