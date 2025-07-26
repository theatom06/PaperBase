import { useColorScheme } from 'react-native';

const lightTheme = {
  text: '#000000',
  textSecondary: '#666666',
  tagText: '#222222',
  background: '#f1f1f1',
  mainBackground: '#ffffff',
  tagBackground: '#eeeeee',
  shadow: '#cccccc',
  tint: '#2f95dc',
  border: '#dddddd',
};

const darkTheme = {
  text: '#ffffff',
  textSecondary: '#cccccc',
  tagText: '#eeeeee',
  background: '#000000',
  mainBackground: '#1a1a1a',
  tagBackground: '#333333',
  shadow: '#000000',
  tint: '#2f95dc',
  border: '#444444',
};

export default function useTheme () {
  const isDark = useColorScheme() === 'dark';
  return isDark ? darkTheme : lightTheme;
}

export const Colors = {
  light: lightTheme,
  dark: darkTheme,
};