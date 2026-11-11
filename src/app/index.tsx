import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Pressable,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/theme";

const API_URL = "https://newsreadermobile.onrender.com";

type Article = {
  id: number;
  title: string;
  description: string | null;
  url: string;
  imageUrl: string | null;
  publishedAt: string | null;
  source: {
    name: string;
  };
};

function formatPublishedDate(date: string | null) {
  if (!date) return "Date unavailable";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<"en" | "ta">("en");
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError("");
      setPage(1);
      setHasMore(true);

      console.log("Fetching articles...");

      const response = await axios.get(`${API_URL}/api/articles`, {
        params: {
          language,
          search: debouncedSearch,
          page: 1,
          limit: 10,
        },
        timeout: 20000,
      });

      console.log("Articles fetched successfully");

      setArticles(response.data.articles);
      setHasMore(response.data.page < response.data.totalPages);
    } catch (error) {
      console.log("Fetch error:", error);

      setError("Unable to connect to the news server.");
    } finally {
      console.log("Request finished");
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      const response = await axios.get(`${API_URL}/api/articles`, {
        params: {
          language,
          search: debouncedSearch,
          page: 1,
          limit: 10,
        },
      });

      setArticles(response.data.articles);
      setPage(1);
      setHasMore(response.data.page < response.data.totalPages);
    } catch (error) {
      console.log("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const loadMore = async () => {
    if (loadingMore || !hasMore || loading) return;

    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const response = await axios.get(`${API_URL}/api/articles`, {
        params: {
          language,
          search: debouncedSearch,
          page: nextPage,
          limit: 10,
        },
      });

      setArticles((current) => [...current, ...response.data.articles]);

      setPage(nextPage);
      setHasMore(nextPage < response.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [language, debouncedSearch]);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
      paddingTop: 60,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.text,
    },
    subtitle: {
      fontSize: 15,
      color: theme.textSecondary,
      marginTop: 6,
      marginBottom: 20,
    },
    articleCard: {
      padding: 16,
      backgroundColor: theme.backgroundElement,
      borderRadius: 12,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: theme.backgroundSelected,
    },
    articleTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
    },
    description: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 8,
    },
    source: {
      fontSize: 12,
      color: colorScheme === "dark" ? "#a5b4fc" : "#4f46e5",
      marginTop: 10,
      fontWeight: "600",
    },
    languageContainer: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 20,
    },
    languageButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      backgroundColor: theme.backgroundElement,
      overflow: "hidden",
    },
    selectedLanguage: {
      backgroundColor: colorScheme === "dark" ? "#4338ca" : "#3730a3",
      color: "#ffffff",
      fontWeight: "bold",
    },
    searchInput: {
      backgroundColor: theme.backgroundElement,
      color: theme.text,
      padding: 14,
      borderRadius: 10,
      fontSize: 16,
      marginBottom: 20,
    },
    articleMeta: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 12,
    },
    date: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    emptyContainer: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      paddingVertical: 60,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
    },
    emptyDescription: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 8,
      textAlign: "center",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },
    errorMessage: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 8,
      textAlign: "center",
    },
    retryButton: {
      backgroundColor: colorScheme === "dark" ? "#4338ca" : "#3730a3",
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 8,
      marginTop: 20,
    },
    retryButtonText: {
      color: "#ffffff",
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>News Reader</Text>
      <Text style={styles.subtitle}>Latest news from your sources</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        onChangeText={setSearch}
        placeholderTextColor={theme.textSecondary}
        value={search}
      />

      <View style={styles.languageContainer}>
        <Text
          style={[
            styles.languageButton,
            language === "en" && styles.selectedLanguage,
            { color: language === "en" ? "#ffffff" : theme.text },
          ]}
          onPress={() => setLanguage("en")}
        >
          English
        </Text>

        <Text
          style={[
            styles.languageButton,
            language === "ta" && styles.selectedLanguage,
            { color: language === "ta" ? "#ffffff" : theme.text },
          ]}
          onPress={() => setLanguage("ta")}
        >
          Tamil
        </Text>
      </View>

      <Text>{search === "" ? "" : "Search Results"}</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>

          <Text style={styles.errorMessage}>{error}</Text>

          <Pressable style={styles.retryButton} onPress={fetchArticles}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/article/[id]",
                  params: {
                    id: String(item.id),
                    title: item.title,
                    description: item.description ?? "",
                    url: item.url,
                    source: item.source.name,
                    publishedAt: item.publishedAt ?? "",
                  },
                })
              }
            >
              <View style={styles.articleCard}>
                <Text style={styles.articleTitle}>{item.title}</Text>

                <Text style={styles.description}>{item.description}</Text>

                <View style={styles.articleMeta}>
                  <Text style={styles.source}>{item.source.name}</Text>
                  <Text style={styles.date}>
                    {formatPublishedDate(item.publishedAt)}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No articles found</Text>

              <Text style={styles.emptyDescription}>
                {search
                  ? "Try a different search term."
                  : "No articles are currently available in this language."}
              </Text>
            </View>
          }
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="small" style={{ marginVertical: 20 }} />
            ) : undefined
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
  
}

