import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import { Stack } from 'expo-router';
import Paper from '@/components/PaperCard';
import theme from '@/constants/Colors';
import papers, { boards, subjects, schools } from '../fakeData';

const filterTabs = ['Board', 'Subject', 'School'] as const;
type FilterTab = typeof filterTabs[number];

export default function SearchScreen() {
  const Colors = theme();

  const [query, setQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<FilterTab>('Board');
  const [isExpanded, setIsExpanded] = useState(false);

  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [results, setResults] = useState(papers);

  const filterData = {
    Board: boards,
    Subject: subjects,
    School: schools,
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    updateResults(text, selectedBoard, selectedSubject, selectedSchool);
  };

  const updateResults = (
    text: string,
    board: string | null,
    subject: string | null,
    school: string | null
  ) => {
    const filtered = papers.filter((p) => {
      const matchesQuery = p.title.toLowerCase().includes(text.toLowerCase());
      const matchesBoard = !board || p.board === board;
      const matchesSubject = !subject || p.subject === subject;
      const matchesSchool = !school || p.school === school;
      return matchesQuery && matchesBoard && matchesSubject && matchesSchool;
    });

    setResults(filtered);
  };

  const handleChipSelect = (category: string, value: string) => {
    if (category === 'Board') {
      setSelectedBoard(value === selectedBoard ? null : value);
    } else if (category === 'Subject') {
      setSelectedSubject(value === selectedSubject ? null : value);
    } else if (category === 'School') {
      setSelectedSchool(value === selectedSchool ? null : value);
    }
    updateResults(query,
      category === 'Board' ? (value === selectedBoard ? null : value) : selectedBoard,
      category === 'Subject' ? (value === selectedSubject ? null : value) : selectedSubject,
      category === 'School' ? (value === selectedSchool ? null : value) : selectedSchool
    );
  };

  const renderChip = (value: string, selected: boolean, onPress: () => void) => (
    <Pressable
      key={value}
      onPress={onPress}
      style={[
        styles.chip,
        { backgroundColor: selected ? Colors.tint : '#eee' },
      ]}
    >
      <Text style={{ color: selected ? '#fff' : '#000' }}>{value}</Text>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Search' }} />
      <View style={[styles.container, { backgroundColor: Colors.background }]}>
        <TextInput
          placeholder="Search papers..."
          value={query}
          onChangeText={handleSearch}
          onFocus={() => { setIsExpanded(true); console.log('Input focused'); }}
          style={styles.input}
        />

        {/* Filter Tabs */}
        {isExpanded && (
          <>
            <View style={styles.tabs}>
              {filterTabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setSelectedTab(tab)}
                  style={[
                    styles.tab,
                    selectedTab === tab && {
                      borderBottomColor: Colors.tint,
                      borderBottomWidth: 2,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: selectedTab === tab ? Colors.tint : '#555',
                      fontWeight: selectedTab === tab ? 'bold' : 'normal',
                    }}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Chip Selections */}
            <View style={styles.chipContainer}>
              {filterData[selectedTab].map((item: string) =>
                renderChip(
                  item,
                  (selectedTab === 'Board' && selectedBoard === item) ||
                    (selectedTab === 'Subject' && selectedSubject === item) ||
                    (selectedTab === 'School' && selectedSchool === item),
                  () => handleChipSelect(selectedTab, item)
                )
              )}
            </View>

            {/* Collapse button */}
            <TouchableOpacity
              style={styles.collapseBtn}
              onPress={() => setIsExpanded(false)}
            >
              <Text style={{ color: Colors.tint }}>Collapse Filters</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Active Filter Chips (visible when collapsed) */}
        {!isExpanded && (
          <View style={styles.activeChipsRow}>
            {selectedBoard && renderChip(selectedBoard, true, () => handleChipSelect('Board', selectedBoard))}
            {selectedSubject && renderChip(selectedSubject, true, () => handleChipSelect('Subject', selectedSubject))}
            {selectedSchool && renderChip(selectedSchool, true, () => handleChipSelect('School', selectedSchool))}
          </View>
        )}

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Paper {...item} />}
          contentContainerStyle={styles.list}
          style={{ flexGrow: 1 }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  input: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },

  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },

  collapseBtn: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },

  activeChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 8,
  },

  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 8,
    gap: 8,
  },
});