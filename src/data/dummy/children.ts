// DATA CONTOH untuk pengembangan UI. Bukan data nyata dan bukan dari server.
import type { Child } from '@/types/pickup';

export const DUMMY_CHILDREN: Child[] = [
  { id: 'c1', name: 'Budi Santoso', className: '3 A', gate: 'Gerbang A', method: 'orang_tua', status: 'belum_antre' },
  { id: 'c2', name: 'Citra Santoso', className: '5 B', gate: 'Gerbang A', method: 'titip', status: 'menunggu' },
  { id: 'c3', name: 'Dewi Lestari', className: '1 C', gate: 'Gerbang B', method: 'jemputan', status: 'diumumkan' },
  { id: 'c4', name: 'Eko Prasetyo', className: '6 A', gate: 'Gerbang B', method: 'orang_tua', status: 'selesai', completedBy: 'otomatis' },
];