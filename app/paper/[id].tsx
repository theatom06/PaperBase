import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, View, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function PaperDetailScreen() {
  const { id } = useLocalSearchParams();

  // Simulated data for the paper detail
  const name = id ? `1st Mid Term` : 'Paper Detail';
  const author = "Steve";
  const published = '18 July 25';
  const description = "This is a sample paper for the 1st Mid Term exam. It covers all the important topics and is designed to help students prepare effectively.";
  const board = 'CBSE';
  const subject = 'Mathematics';
  const school = 'ABC High School';

  return (
    <>
      <Stack.Screen
        options={{
          title: name,
          headerRight: () => (
            <Pressable
              onPress={() => console.log('Report')}
              style={[styles.reportButton, { backgroundColor: Colors.dangerRed }]}>

              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={24}
                color="#fff"
              />

              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 900 }}>Report</Text>
            </Pressable>
          ),
        }}
      />

      <ScrollView style={[styles.container, { backgroundColor: Colors.background }]} contentContainerStyle={{ alignItems: 'center' }}>
        <View style={[styles.innerContainer, { backgroundColor: Colors.mainBackground }]}>
          <Image
            source={{ uri: `https://picsum.photos/seed/${id}/800/600` }}
            style={styles.image}
          />

          <Text style={[styles.title, { color: Colors.text }]}>{name}</Text>
          <Text style={styles.school}>{school}</Text>
          <Text style={[styles.description, { color: Colors.textSecondary }]}>{description}</Text>

          <View style={styles.metadata}>
            <View style={styles.metaElement}>
              <MaterialIcons name="school" size={24} color={Colors.textSecondary} />
              <Text style={[styles.metaText, { color: Colors.text }]}>{board}</Text>
            </View>
            
            <View style={styles.metaElement}>
              <MaterialIcons name="book" size={24} color={Colors.textSecondary} />
              <Text style={[styles.metaText, { color: Colors.text }]}>{subject}</Text>
            </View>
          </View>

          <View style={styles.metadata}>
            <View style={styles.metaElement}>
              <MaterialIcons name="person" size={24} color={Colors.textSecondary} />
              <Text style={[styles.metaText, { color: Colors.text }]}>{author}</Text>
            </View>

            <View style={styles.metaElement}>
              <MaterialIcons name="date-range" size={24} color={Colors.textSecondary} />
              <Text style={[styles.metaText, { color: Colors.text }]}>{published}</Text>
            </View>
          </View>

          <Pressable style={styles.button} onPress={() => console.log('Download')}>
            <MaterialCommunityIcons name="download" size={20} color="#fff" />
            <Text style={styles.buttonText}>Download Questions</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => console.log('Download')}>
            <MaterialCommunityIcons name="download" size={20} color="#fff" />
            <Text style={styles.buttonText}>Download Answers</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
  },

  innerContainer: {
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 25,
  },

  image: {
    width: '100%',
    maxWidth: 600,
    aspectRatio: 16 / 9,
    borderRadius: 12,
    marginBottom: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 4,
  },

  school: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 12,
    fontStyle: 'italic',
  },

  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },

  metaElement: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  metaText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },

  description: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
    textAlign: 'center',
  },


  button: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    backgroundColor: Colors.infoBlue,

    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
  }
});
