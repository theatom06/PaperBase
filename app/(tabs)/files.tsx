import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import PaperCard from '@/components/Paper';

const papers = [
  { title: "Board Exam", description: "ICSE Math 2024 board paper", chapters: ['All'], author: 'Steve', date: '5th August', views: 1000, rating: 4.5 },
  { title: "Worksheet", description: "Physics Worksheet 2023", chapters: ['Ch. 1', 'Ch. 2'], author: 'Alex', date: '12th July', views: 800, rating: 4.2 },
  { title: "Cheatsheet", description: "Chemistry Quick Notes", chapters: ['Organic'], author: 'Sam', date: '20th June', views: 500, rating: 4.8 },
  { title: "Sample Paper", description: "Math Sample 2022", chapters: ['All'], author: 'Riya', date: '3rd May', views: 600, rating: 4.0 },
  { title: "Revision Notes", description: "History Revision Notes", chapters: ['Ch. 1', 'Ch. 3'], author: 'Maya', date: '15th April', views: 700, rating: 4.6 },
  { title: "Practice Test", description: "Biology Practice Test", chapters: ['Ch. 2'], author: 'John', date: '10th March', views: 900, rating: 4.3 },
  { title: "Mock Exam", description: "English Mock Exam", chapters: ['All'], author: 'Emma', date: '1st February', views: 1100, rating: 4.7 },
  { title: "Project Report", description: "Physics Project Report", chapters: ['Organic', 'Inorganic'], author: 'Liam', date: '25th January', views: 400, rating: 4.1 },
  { title: "Class Notes", description: "Math Class Notes", chapters: ['Ch. 1', 'Ch. 2', 'Ch. 3'], author: 'Olivia', date: '18th December', views: 300, rating: 4.4 },
];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Downloads</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    padding: 10,
  },
  separator: {
    height: 1,
    width: '100%',
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