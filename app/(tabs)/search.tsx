import { View, StyleSheet, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import { Stack } from 'expo-router';
import Paper from '@/components/PaperCard';
import { Picker } from '@react-native-picker/picker';
import papers from '../fakeData'; // Assuming you have a data file with paper details


export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [results, setResults] = useState(papers);

  const handleSearch = (text: string) => {
    setQuery(text);

    const filtered = papers.filter((p) => {
      const matchesQuery = p.title.toLowerCase().includes(text.toLowerCase());
      const matchesBoard = selectedBoard === '' || p.board === selectedBoard;
      const matchesSubject = selectedSubject === '' || p.subject === selectedSubject;
      const matchesSchool = selectedSchool === '' || p.school === selectedSchool;
      return matchesQuery && matchesBoard && matchesSubject && matchesSchool;
    });

    setResults(filtered);
  };

  const handleFilterChange = () => {
    const filtered = papers.filter((p) => {
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
      const matchesBoard = selectedBoard === '' || p.board === selectedBoard;
      const matchesSubject = selectedSubject === '' || p.subject === selectedSubject;
      const matchesSchool = selectedSchool === '' || p.school === selectedSchool;
      return matchesQuery && matchesBoard && matchesSubject && matchesSchool;
    });

    setResults(filtered);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Search' }} />
      <View style={styles.container}>
        <TextInput
          placeholder="Search papers..."
          value={query}
          onChangeText={handleSearch}
          style={styles.input}
        />

        <Picker
          selectedValue={selectedBoard}
          onValueChange={(value) => {
            setSelectedBoard(value);
            handleFilterChange();
          }}
        >
          <Picker.Item label="All Boards" value="" />
          <Picker.Item label="CBSE" value="CBSE" />
          <Picker.Item label="ICSE" value="ICSE" />
        </Picker>

        <Picker
          selectedValue={selectedSubject}
          onValueChange={(value) => {
            setSelectedSubject(value);
            handleFilterChange();
          }}
        >
          <Picker.Item label="All Subjects" value="" />
          <Picker.Item label="Math" value="Math" />
          <Picker.Item label="Physics" value="Physics" />
          <Picker.Item label="Chemistry" value="Chemistry" />
        </Picker>

        <Picker
          selectedValue={selectedSchool}
          onValueChange={(value) => {
            setSelectedSchool(value);
            handleFilterChange();
          }}
        >
          <Picker.Item label="All Schools" value="" />
          <Picker.Item label="Delhi Public School" value="Delhi Public School" />
          <Picker.Item label="XYZ Public School" value="XYZ Public School" />
          <Picker.Item label="St. Xavier’s" value="St. Xavier’s" />
        </Picker>

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Paper {...item} />}
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
});
