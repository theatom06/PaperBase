import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, View, StyleSheet, Pressable, Image, useColorScheme, ScrollView } from 'react-native';
import { useMemo, useState } from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PaperDetailScreen() {
  const { id } = useLocalSearchParams();
  const name = id ? `1st Mid Term` : 'Paper Detail';
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const views = useMemo(() => Math.floor(Math.random() * 1000) + 100, []);
  const author = "Steve";
  const published = '18 July 25';
  const description = "This is a sample paper for the 1st Mid Term exam. It covers all the important topics and is designed to help students prepare effectively.";
  const tags = ['AP', 'GP', 'Reflection', 'Trigonometry'];
  const [rating, setRating] = useState(0);

  return (
    <>
      <Stack.Screen options={{ title: name }} />
      <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f9f9f9' }]}>
        <Image
          source={{ uri: `https://picsum.photos/seed/${id}/800/600` }}
          style={styles.image}
        />

        <Text style={styles.title}>{name}</Text>

        <Text style={[styles.description, { color: isDark ? '#ccc' : '#444' }]}>{description}</Text>

        <View style={styles.metadata}>
          <MaterialIcons name="person" size={18} color={isDark ? '#aaa' : '#555'} />
          <Text style={styles.metaText}>{author}</Text>

          <MaterialIcons name="visibility" size={18} color={isDark ? '#aaa' : '#555'} style={{ marginLeft: 16 }} />
          <Text style={styles.metaText}>{views} views</Text>
        </View>
        <View style={styles.metadata}>
          <MaterialIcons name="date-range" size={18} color={isDark ? '#aaa' : '#555'} />
          <Text style={styles.metaText}>{published}</Text>

          <MaterialIcons name="star" size={18} color={isDark ? '#aaa' : '#555'} style={{ marginLeft: 16 }} />
          <Text style={styles.metaText}>4.5/5</Text>
        </View>

        <View style={styles.tagsContainer}>
          {tags.map((tag, idx) => (
            <View key={idx} style={[styles.tag, { backgroundColor: isDark ? '#333' : '#e0e0e0' }]}>
              <Text style={{ color: isDark ? '#ccc' : '#333', fontSize: 12 }}>#{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.ratingRow}>
          <Text style={[styles.rateLabel, { color: isDark ? '#bbb' : '#444' }]}>Rate this paper</Text>
          {[...Array(5)].map((_, i) => (
              <Pressable key={i} onPress={() => setRating(i + 1)}>
                <MaterialIcons
                  name={i < rating ? 'star' : 'star-border'}
                  size={28}
                  color={isDark ? '#ffc107' : '#ff9800'}
              />
              </Pressable>
          ))}
        </View>

        <Pressable style={styles.button} onPress={() => console.log('Download')}>
          <MaterialCommunityIcons name="download" size={20} color="#fff" />
          <Text style={styles.buttonText}>Download PDF</Text>
        </Pressable>

        <Pressable onPress={() => console.log('Report')} style={[styles.button, styles.reportButton]}>
          <MaterialCommunityIcons name="alert-circle-outline" size={20} color={'white'} />
          <Text style={styles.buttonText}>Report this content</Text>
        </Pressable>

        <View style={{ height: 32 }} /> {/* Bottom padding */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  image: {
    width: '100%',
    maxWidth: 600,
    aspectRatio: 16 / 9,
    borderRadius: 12,
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },

  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    gap: 0,
  },

  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },

  description: {
    fontSize: 15,
    marginBottom: 12,
    lineHeight: 22,
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  rateLabel: {
    fontSize: 14,
    marginLeft: 12,
  },

  button: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    backgroundColor: '#6200ee',
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
    backgroundColor: '#ff1744',
  }
});
