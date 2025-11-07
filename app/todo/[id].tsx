import React from "react";

import {
  Link,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTodos } from "@/contexts/todo-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { formatDate } from "@/utils/date";

export default function TodoDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { todos, toggleCheck, removeTodo } = useTodos();
  const error = useThemeColor({}, "error");
  const tint = useThemeColor({}, "tint");

  const todo = todos.find((t) => t.id === String(id));

  const confirmDelete = () => {
    if (!todo) return;
    if (Platform.OS === "web") {
      if (confirm("Delete this to‑do?")) {
        removeTodo(todo.id);
        router.back();
      }
      return;
    }
    Alert.alert("Delete to‑do", "Are you sure you want to delete this to‑do?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          removeTodo(todo.id);
          router.back();
        },
      },
    ]);
  };

  if (!todo) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerRow}>
            <Link href="/" style={styles.backLink}>
              <IconSymbol name="chevron.left" color={tint} />
            </Link>
            <ThemedText type="title">To‑Do</ThemedText>
            <View style={{ width: 28 }} />
          </View>
          <View style={styles.centerWrap}>
            <ThemedText>To‑do not found.</ThemedText>
            <Link href="/" asChild>
              <ThemedButton title="Back to list" />
            </Link>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerRow}>
          <Link href="/" style={styles.backLink}>
            <IconSymbol name="chevron.left" color={tint} />
          </Link>
          <ThemedText type="title">To‑Do</ThemedText>
          <View style={{ width: 28 }} />
        </View>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.row}>
            <IconSymbol
              name={todo.checked ? "checkmark.circle.fill" : "circle"}
              color={todo.checked ? tint : "#999"}
              size={22}
            />
            <ThemedText type="subtitle" style={styles.status}>
              {todo.checked ? "Completed" : "Pending"}
            </ThemedText>
          </View>
          <ThemedText type="title" style={styles.title}>
            {todo.title}
          </ThemedText>
          {todo.description ? (
            <ThemedText type="default" style={styles.description}>
              {todo.description}
            </ThemedText>
          ) : null}

          <View style={styles.meta}>
            <ThemedText style={styles.metaText}>
              Created: {formatDate(todo.createdAt)}
            </ThemedText>
            {todo.checkedAt && (
              <ThemedText style={styles.metaText}>
                Completed: {formatDate(todo.checkedAt)}
              </ThemedText>
            )}
          </View>

          <View style={styles.actions}>
            <ThemedButton
              title={todo.checked ? "Mark as Incomplete" : "Mark as Complete"}
              onPress={() => toggleCheck(todo.id)}
              accessibilityLabel={
                todo.checked
                  ? "Mark todo as incomplete"
                  : "Mark todo as complete"
              }
            />
            <ThemedButton
              title="Delete"
              onPress={confirmDelete}
              accessibilityLabel="Delete to‑do"
              style={[styles.deleteButton, { backgroundColor: error }]}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  safeArea: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backLink: { padding: 8 },
  content: { paddingBottom: 40, gap: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  status: { opacity: 0.8 },
  title: { marginTop: 4 },
  description: { lineHeight: 22 },
  meta: { gap: 2, marginTop: 8 },
  metaText: { fontSize: 12, opacity: 0.7 },
  actions: { gap: 8, marginTop: 16 },
  centerWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  deleteButton: { opacity: 0.85 },
});
