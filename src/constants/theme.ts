/**
 * Design tokens aplikasi Antar Jemput Sekolah.
 * Semua warna, ukuran teks, jarak, radius, dan ukuran tombol ada di sini
 * supaya seluruh layar konsisten. Jangan menulis angka atau warna langsung di layar.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0F172A',
    textSecondary: '#475569',
    background: '#F6F8FC',
    card: '#FFFFFF',
    backgroundElement: '#EEF2F8',
    backgroundSelected: '#DCE4F0',
    border: '#D8E0EC',
    primary: '#1D5FD6',
    primarySoft: '#E3EDFC',
    onPrimary: '#FFFFFF',
    success: '#15803D',
    successSoft: '#DCFCE7',
    warning: '#B45309',
    warningSoft: '#FEF3C7',
    danger: '#B91C1C',
    dangerSoft: '#FEE2E2',
    overlay: 'rgba(15, 23, 42, 0.5)',
  },
  dark: {
    text: '#F1F5F9',
    textSecondary: '#A7B3C7',
    background: '#0B1220',
    card: '#141C2E',
    backgroundElement: '#1B2438',
    backgroundSelected: '#26324A',
    border: '#2A3550',
    primary: '#7AA9FF',
    primarySoft: '#1B2B4D',
    onPrimary: '#0B1220',
    success: '#4ADE80',
    successSoft: '#12301F',
    warning: '#FBBF24',
    warningSoft: '#3A2C0A',
    danger: '#F87171',
    dangerSoft: '#3B1414',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const FontSize = {
  caption: 13,
  label: 14,
  body: 16,
  title: 18,
  heading: 24,
} as const;

export const LineHeight = {
  caption: 18,
  label: 20,
  body: 24,
  title: 26,
  heading: 32,
} as const;

export const Sizes = {
  /** Ukuran minimum area sentuh yang nyaman. */
  touch: 48,
  button: 52,
  buttonSmall: 44,
  avatar: 48,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;