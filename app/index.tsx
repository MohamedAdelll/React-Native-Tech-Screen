import React from "react";

import { Link } from "expo-router";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import TodoPreview from "@/components/todo/preview";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTodos } from "@/contexts/todo-context";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function HomeScreen() {
  const { todos } = useTodos();
  const tint = useThemeColor({}, "tint");

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerRow}>
          <ThemedText type="title">To‑Do List</ThemedText>
          <Link href="/modal" style={styles.addLink}>
            <IconSymbol name="plus" color={tint} />
          </Link>
        </View>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <TodoPreview item={item} />}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  safeArea: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  list: {
    marginTop: 16,
    gap: 12,
    paddingBottom: 40,
  },
  addLink: {
    padding: 8,
  },
});
