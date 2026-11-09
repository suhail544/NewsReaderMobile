
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
} from "react-native";

import { useLocalSearchParams, Stack } from "expo-router";

export default function ArticleDetails() {
  const {
    title,
    description,
    url,
    source,
    publishedAt,
  } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    url: string;
    source: string;
    publishedAt: string;
  }>();

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date unavailable";

  return (
    <>
      <Stack.Screen options={{ title: "Article", headerBackTitle: "Back" }} />

      <ScrollView style={styles.container}>
        <Text style={styles.source}>{source}</Text>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.date}>{formattedDate}</Text>

        <View style={styles.divider} />

        <Text style={styles.description}>
          {description || "No description available."}
        </Text>

        <Pressable
          style={styles.readButton}
          onPress={() => {
            if (url) Linking.openURL(url);
          }}
        >
          <Text style={styles.readButtonText}>
            Read Full Article
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  source: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4f46e5",
    marginTop: 12,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 14,
    lineHeight: 34,
  },
  date: {
    fontSize: 13,
    color: "#9ca3af",
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 22,
  },
  description: {
    fontSize: 17,
    lineHeight: 28,
    color: "#374151",
  },
  readButton: {
    backgroundColor: "#3730a3",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  readButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
