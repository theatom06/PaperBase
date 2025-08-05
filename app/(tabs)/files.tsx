import { StyleSheet, ScrollView, Text, View } from 'react-native';
import PaperCard from '@/components/PaperCard';
import Colors from '@/constants/Colors';
import Icons from '@expo/vector-icons/MaterialIcons';
import papers from '../fakeData';

type IconProps = {
  name: React.ComponentProps<typeof Icons>['name'];
  color?: string;
};

function Icon({ name, color = '#666' }: IconProps) {
  return <Icons name={name} size={48} color={color} style={ { margin: 0 } } />;
}

export default function TabOneScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Icon name="folder" color="#666" />
        <Text style={[styles.titleText, { color: Colors.text }]}>Files</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        {papers.map((paper, idx) => (
          <PaperCard
            key={idx}
            {...paper}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  title: {
    width: '100%',
    textAlign: 'left',
    padding: 10,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingBottom: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: Colors.mainBackground,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },

  body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 8,
    width: '100%',
  },
});