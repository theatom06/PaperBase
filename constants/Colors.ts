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

export default lightTheme; 

export const Colors = {
  light: lightTheme,
  //dark ommitted as it looks bas
};