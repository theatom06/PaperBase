import { View, StyleSheet, TextInput, ScrollView, Text, TouchableOpacity, Pressable } from 'react-native';
import { useState } from 'react';
import { Stack } from 'expo-router';
import Paper from '@/components/PaperCard';
import Colors from '@/constants/Colors';
import papers, { boards, subjects, schools } from '../fakeData';

const filterTabs = ['Board', 'Subject', 'School'] as const;
type FilterTab = typeof filterTabs[number];

export default function () {
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
    if (category === 'Board')
      setSelectedBoard(value === selectedBoard ? null : value);
    else if (category === 'Subject')
      setSelectedSubject(value === selectedSubject ? null : value);
    else if (category === 'School')
      setSelectedSchool(value === selectedSchool ? null : value);

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
      ]}>
      <Text style={{ color: selected ? '#fff' : '#000' }}>{value}</Text>
    </Pressable>
  );

  return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search papers..."
            value={query}
            onChangeText={handleSearch}
            onFocus={() => { setIsExpanded(true); console.log('Input focused'); }}
            style={styles.input}
          />

          {isExpanded && (
            <View style={styles.filterContainer}>
              <View style={styles.tabs}>
                {filterTabs.map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setSelectedTab(tab)}
                    style={[
                      styles.tab,
                      { borderTopLeftRadius: filterTabs.indexOf(tab) === 0 ? 8 : 0,
                        borderBottomLeftRadius: filterTabs.indexOf(tab) === 0 ? 8 : 0,
                        borderTopRightRadius: filterTabs.indexOf(tab) === filterTabs.length - 1 ? 8 : 0,
                        borderBottomRightRadius: filterTabs.indexOf(tab) === filterTabs.length - 1 ? 8 : 0,
                      },
                      selectedTab === tab && {
                        backgroundColor: Colors.tint,
                      },
                    ]}>

                    <Text
                      style={[styles.tabText, { color: selectedTab === tab ? '#fff' : Colors.tint }]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

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

              <TouchableOpacity style={styles.collapseBtn} onPress={() => setIsExpanded(false)}>
                <Text style={styles.collapseBtnText}>Collapse Filter</Text>
              </TouchableOpacity>
            </View>
          )}

          {!isExpanded && (
          <View style={styles.activeChipsRow}>
            {selectedBoard && renderChip(selectedBoard, true, () => handleChipSelect('Board', selectedBoard))}
            {selectedSubject && renderChip(selectedSubject, true, () => handleChipSelect('Subject', selectedSubject))}
            {selectedSchool && renderChip(selectedSchool, true, () => handleChipSelect('School', selectedSchool))}
          </View>
          )}

        </View>
        <ScrollView
          contentContainerStyle={styles.list}
          style={{ flexGrow: 1 }}>

          {results.map((paper, idx) => (
            <Paper
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

  inputContainer: {
    padding: 12,
    backgroundColor: Colors.mainBackground,
    borderColor: Colors.border,
    borderWidth: 1,
  },

  input: {
    backgroundColor: Colors.mainBackground,
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },

  filterContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: Colors.mainBackground,
    borderRadius: 8,
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    borderRadius: 8,
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderLeftColor: Colors.tint,
    width: '33%',
    borderColor: Colors.tint,
    borderWidth: 1,
  },

  tabText: {
    color: Colors.tint,
    textAlign: 'center',
    fontWeight: 'bold',
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
    padding: 8,
    backgroundColor: Colors.dangerRed,
    borderRadius: 8,
  },

  collapseBtnText: {
    color: '#fff',
    textAlign: 'center',
  },

  activeChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },

  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 8,
    width: '100%',
  },
});