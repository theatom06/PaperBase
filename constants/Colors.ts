import { useColorScheme } from 'react-native';

const colors = {
  dangerRed: '#eb4034',
  successGreen: '#00ff00',
  warningYellow: '#ffff00',
  infoBlue: '#0000ff',
  tint: '#2f95dc',
}

const lightTheme = {
  text: '#000000',
  textSecondary: '#666666',
  tagText: '#222222',
  background: '#f1f1f1',
  mainBackground: '#ffffff',
  tagBackground: '#eeeeee',
  shadow: '#cccccc',
  border: '#dddddd',
  ...colors,
};

const darkTheme = {
  text: '#ffffff',
  textSecondary: '#cccccc',
  tagText: '#eeeeee',
  background: '#000000',
  mainBackground: '#1a1a1a',
  tagBackground: '#333333',
  shadow: '#000000',
  border: '#444444',
  ...colors,
};

export default function useTheme () {
  const isDark = useColorScheme() === 'dark';
  return isDark ? darkTheme : lightTheme;
}

export const Colors = {
  light: lightTheme,
  dark: darkTheme,
};