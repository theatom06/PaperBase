import { StyleSheet, Text, View } from 'react-native';
import theme from '@/constants/Colors';

export default function TabOneScreen() {
  const Colors = theme();

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
