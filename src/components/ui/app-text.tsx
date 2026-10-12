import { StyleSheet, Text, type TextProps } from 'react-native';

import { FontSize, LineHeight, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AppTextVariant = 'heading' | 'title' | 'body' | 'label' | 'caption' | 'button';

export type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  color?: ThemeColor;
};

export function AppText({ variant = 'body', color = 'text', style, ...rest }: AppTextProps) {
  const theme = useTheme();
  return <Text style={[{ color: theme[color] }, styles[variant], style]} {...rest} />;
}

const styles = StyleSheet.create({
  heading: { fontSize: FontSize.heading, lineHeight: LineHeight.heading, fontWeight: '700' },
  title: { fontSize: FontSize.title, lineHeight: LineHeight.title, fontWeight: '700' },
  body: { fontSize: FontSize.body, lineHeight: LineHeight.body, fontWeight: '400' },
  label: { fontSize: FontSize.label, lineHeight: LineHeight.label, fontWeight: '600' },
  caption: { fontSize: FontSize.caption, lineHeight: LineHeight.caption, fontWeight: '400' },
  button: { fontSize: FontSize.body, lineHeight: 22, fontWeight: '600' },
});