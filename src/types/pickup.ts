/** Status permintaan penjemputan. Nilai ini harus sama dengan yang dikirim server. */
export type PickupStatus =
  | 'belum_antre'
  | 'menunggu'
  | 'diumumkan'
  | 'selesai'
  | 'dibatalkan'
  | 'kedaluwarsa'
  | 'gangguan';

/** Cara anak dijemput pada hari tertentu. */
export type PickupMethod = 'orang_tua' | 'titip' | 'jemputan';

export type Child = {
  id: string;
  name: string;
  /** Contoh: "3 A" */
  className: string;
  /** Contoh: "Gerbang A" */
  gate: string;
  method: PickupMethod;
  status: PickupStatus;
  /** Dibedakan agar status otomatis tidak terlihat seperti konfirmasi wali. */
  completedBy?: 'wali' | 'otomatis';
};