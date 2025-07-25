//The card for each paper in the any tab
import { StyleSheet , View, Text, Image, useColorScheme } from 'react-native';
import Icons from '@expo/vector-icons/MaterialIcons';

type IconProps = {
  name: React.ComponentProps<typeof Icons>['name'];
  color?: string;
};

function Icon({ name, color = '#666' }: { name: React.ComponentProps<typeof Icons>['name'], color?: string }) {
  return <Icons name={name} size={16} color={color} style={{ marginRight: 3 }} />;
}

type PaperCardProps = {
  title?: string;
  description?: string;
  chapters?: string[];
  author?: string;
  date?: string;
  views?: number;
  rating?: number;
  thumbnailUrl?: string;
  style?: object;
};

export default function PaperCard({
  title = 'Untitled',
  description = 'No description available.',
  chapters = [],
  author = 'Unknown',
  date = 'N/A',
  views = 0,
  rating = 0,
  thumbnailUrl,
  style,
}: PaperCardProps) {
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const colors = {
    background: isDark ? '#1a1a1a' : '#fff',
    textPrimary: isDark ? '#f8f8f8' : '#111',
    textSecondary: isDark ? '#ccc' : '#444',
    tagBackground: isDark ? '#333' : '#eee',
    tagText: isDark ? '#eee' : '#222',
    shadow: isDark ? '#000' : '#000',
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.background, shadowColor: colors.shadow }, style]}>
      {thumbnailUrl && (
        <Image
          source={{ uri: thumbnailUrl }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      )}

      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>

      {chapters.length > 0 && (
        <View style={styles.tags}>
          {chapters.map((tag, idx) => (
            <Text key={idx} style={[styles.tag, {
              backgroundColor: colors.tagBackground,
              color: colors.tagText
            }]}>
              {tag}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Icon name="person" color={colors.textSecondary} />
          <Text style={[styles.metaText, { color: colors.textSecondary }]}>{author}</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="calendar-today" color={colors.textSecondary} />
          <Text style={[styles.metaText, { color: colors.textSecondary }]}>{date}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Icon name="visibility" color={colors.textSecondary} />
          <Text style={[styles.metaText, { color: colors.textSecondary }]}>{views}</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="star" color={colors.textSecondary} />
          <Text style={[styles.metaText, { color: colors.textSecondary }]}>{rating}/5</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 300,
    maxWidth: '100%',
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