import { Platform, useColorScheme } from 'react-native';

export const COLORS = {
  light: {
    background: '#f5f3ff',
    surface: '#ffffff',
    text: '#1f1b2e',
    textMuted: '#666666',
    border: '#cccccc',
    input: '#ffffff',
    error: '#d93025',
    button: '#3e04c3',
    primary: '#3e04c3',
    card: '#5b3fd1',
    cardText: '#ffffff',
    cardMuted: '#e4d9ff',
    chip: '#e4e4e4',
    chipText: '#333333',
    summaryBg: '#e4d9ff',
    summaryText: '#3e04c3',
    overlay: 'rgba(0,0,0,0.45)',
  },
  dark: {
    background: '#121212',
    surface: '#1e1e24',
    text: '#f2f0f7',
    textMuted: '#a1a1aa',
    border: '#3f3f46',
    input: '#27272f',
    error: '#f87171',
    button: '#7c5cf0',
    primary: '#c4b5fd',
    card: '#4c3aa8',
    cardText: '#ffffff',
    cardMuted: '#d4c8ff',
    chip: '#2f2f38',
    chipText: '#e4e4e7',
    summaryBg: '#2a2540',
    summaryText: '#c4b5fd',
    overlay: 'rgba(0,0,0,0.6)',
  },
};

// Hook que devolve as cores do modo atual do sistema
export function useTheme() {
  const scheme = useColorScheme();
  return COLORS[scheme === 'dark' ? 'dark' : 'light'];
}

// Sombra por plataforma (iOS: shadow*, Android: elevation)
export const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  android: { elevation: 4 },
  default: { boxShadow: '0 2px 4px rgba(0,0,0,0.25)' },
});