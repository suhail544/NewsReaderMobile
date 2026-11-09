import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  useColorScheme,
} from "react-native";

import * as WebBrowser from "expo-web-browser";
import { useLocalSearchParams, Stack } from "expo-router";
import { Colors } from "@/constants/theme";

export default function ArticleDetails() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    source: {
      fontSize: 14,
      fontWeight: "600",
      color: colorScheme === "dark" ? "#a5b4fc" : "#4f46e5",
      marginTop: 12,
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      color: theme.text,
      marginTop: 14,
      lineHeight: 34,
    },
    date: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 12,
    },
    divider: {
      height: 1,
      backgroundColor: theme.backgroundSelected,
      marginVertical: 22,
    },
    description: {
      fontSize: 17,
      lineHeight: 28,
      color: theme.text,
    },
    readButton: {
      backgroundColor: colorScheme === "dark" ? "#4338ca" : "#3730a3",
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

  const { title, description, url, source, publishedAt } =
    useLocalSearchParams<{
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
      <Stack.Screen
        options={{
          title: "Article",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          headerTitleStyle: {
            color: theme.text,
          },
        }}
      />

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
          onPress={async () => {
            if (url) {
              await WebBrowser.openBrowserAsync(url);
            }
          }}
        >
          <Text style={styles.readButtonText}>Read Full Article</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}
