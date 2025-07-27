import { StyleSheet , View, Text, Image, Pressable, useWindowDimensions } from 'react-native';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import theme from '@/constants/Colors';
const router = useRouter();

function Icon({ name, color = '#666' }: { name: React.ComponentProps<typeof Icons>['name'], color?: string }) {
  return <Icons name={name} size={16} color={color} style={{ marginRight: 3 }} />;
}

type PaperCardProps = {
  id: string;
  title?: string;
  description?: string;
  chapters?: string[];
  author?: string;
  date?: string;
  views?: number;
  rating?: number;
  thumbnailUrl?: string;
  style?: object;
  board?: string;
  subject?: string;
  school?: string;
};

export default function PaperCard({
  id = '',
  title = 'Untitled',
  description = 'No description available.',
  chapters = [],
  author = 'Unknown',
  date = 'N/A',
  views = 0,
  rating = 0,
  thumbnailUrl,
  style,
  board = 'N/A',
  subject = 'N/A',
  school = 'N/A',
}: PaperCardProps) {

  const Colors = theme();
  const { width } = useWindowDimensions();


  const styles = StyleSheet.create({
    card: {
      width: width < 600 ? '100%' : 300,
      minWidth: 300,
      borderRadius: 16,
      padding: 16,
      marginVertical: 4,
      marginHorizontal: 4,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 12,
      elevation: 4,
    },

    thumbnail: {
      width: '100%',
      height: 140,
      borderRadius: 12,
      marginBottom: 12,
    },

    title: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 6,
    },

    description: {
      fontSize: 14,
      marginBottom: 12,
    },

    tags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 12,
    },

    tag: {
      fontSize: 12,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
      marginRight: 8,
      marginBottom: 8,
    },

    metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
    },

    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    metaText: {
      fontSize: 13,
    },
  });

  return (
    <Pressable onPress={() => router.push(`/paper/${id}`)} style={[styles.card, { backgroundColor: Colors.mainBackground, shadowColor: Colors.shadow }, style]}>
      {thumbnailUrl && (
        <Image
          source={{ uri: thumbnailUrl }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      )}

      <Text style={[styles.title, { color: Colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: Colors.textSecondary }]}>{description} </Text>
      <Text style={[styles.description, { color: Colors.textSecondary }]}>School: {school}</Text>

      {chapters.length > 0 && (
        <View style={styles.tags}>
          {chapters.map((tag, idx) => (
            <Text key={idx} style={[styles.tag, {
              backgroundColor: Colors.tagBackground,
              color: Colors.tagText
            }]}>
              {tag}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Icon name="school" color={Colors.textSecondary} />
          <Text style={[styles.metaText, { color: Colors.textSecondary }]}>{board}</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="subject" color={Colors.textSecondary} />
          <Text style={[styles.metaText, { color: Colors.textSecondary }]}>{subject}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Icon name="person" color={Colors.textSecondary} />
          <Text style={[styles.metaText, { color: Colors.textSecondary }]}>{author}</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="calendar-today" color={Colors.textSecondary} />
          <Text style={[styles.metaText, { color: Colors.textSecondary }]}>{date}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Icon name="visibility" color={Colors.textSecondary} />
          <Text style={[styles.metaText, { color: Colors.textSecondary }]}>{views}</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="star" color={Colors.textSecondary} />
          <Text style={[styles.metaText, { color: Colors.textSecondary }]}>{rating}/5</Text>
        </View>
      </View>
    </Pressable>
  );
}