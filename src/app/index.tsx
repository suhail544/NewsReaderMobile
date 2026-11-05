
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { steps } from "react-native-reanimated";

export default function HomeScreen() {
  const [language, setLanguage] = useState<'en' | 'ta'>('en')
  const [search, setSearch] = useState('')

  const articles = [
  {
    id: "1",
    title: "Technology is transforming the world",
    source: "BBC News",
    category: "Technology",
  },
  {
    id: "2",
    title: "Latest developments in artificial intelligence",
    source: "BBC News",
    category: "Science",
  },
  {
    id: "3",
    title: "இந்தியாவின் சமீபத்திய செய்திகள்",
    source: "Oneindia Tamil",
    category: "India",
  },
];

  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>News Reader</Text>
          <Text style={styles.subtitle}>Your world. Your Language. Your News</Text>
        </View>
        <Pressable style={styles.languageButton}
        onPress={()=> setLanguage((current)=> current === 'en' ? 'ta': 'en')}
        >
          <Text>{language === 'en' ? 'English' : 'Tamil'}</Text>
        </Pressable>
      </View>

      <TextInput placeholder="Search News" style={styles.searchInput} value={search} onChangeText={setSearch}/>
      <Text style={styles.sectionTitle}>{language === 'en' ? 'Latest news' : "சமீபத்திய செய்திகள்"}</Text>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 6,
  },
  languageButton: {
    backgroundColor: "#eef2ff",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  languageText: {
    color: "#3730a3",
    fontWeight: "600",
  },
  searchInput: {
    backgroundColor: "#f3f4f6",
    padding: 14,
    borderRadius: 10,
    marginTop: 28,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 28,
    color: "#111827",
  },
});
