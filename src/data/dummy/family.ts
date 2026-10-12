import type { Child } from '@/types/pickup';

// DATA CONTOH untuk Beranda. Bukan data nyata dan bukan dari server.
export const DUMMY_SCHOOL = 'SD Nusantara Mandiri';
export const DUMMY_PARENT_NAME = 'Rina';

export const DUMMY_FAMILY: Child[] = [
  { id: 'f1', name: 'Aisyah Putri Rahma', className: '3 B', gate: 'Gerbang B (Belakang)', method: 'orang_tua', status: 'belum_antre' },
  { id: 'f2', name: 'Rafi Pratama', className: '5 A', gate: 'Gerbang B (Belakang)', method: 'orang_tua', status: 'belum_antre' },
];