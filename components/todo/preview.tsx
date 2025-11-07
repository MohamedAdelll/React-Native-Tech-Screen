import React from "react";

import { router } from "expo-router";
import {
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTodos } from "@/contexts/todo-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { Todo } from "@/types/todo";
import { formatDate } from "@/utils/date";

import { ThemedText } from "../themed-text";

export default function Preview({ item }: { item: Todo }) {
  const { toggleCheck, removeTodo } = useTodos();
  const tint = useThemeColor({}, "tint");
  const error = useThemeColor({}, "error");

  const fade = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: fade.value }));

  const confirmDelete = () => {
    if (Platform.OS === "web") {
      if (confirm("Delete this to‑do?")) removeTodo(item.id);
      return;
    }
    Alert.alert("Delete to‑do", "Are you sure you want to delete this to‑do?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => removeTodo(item.id),
      },
    ]);
  };

  return (
    <Animated.View
      style={[styles.card, item.checked && styles.cardChecked, animatedStyle]}
      layout={LinearTransition.duration(300)}
    >
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={
          item.checked ? "Mark todo as incomplete" : "Mark todo as complete"
        }
        onPress={() => toggleCheck(item.id)}
        style={styles.checkArea}
        activeOpacity={0.7}
      >
        <IconSymbol
          name={item.checked ? "checkmark.circle.fill" : "circle"}
          color={item.checked ? tint : "#999"}
          size={22}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.leftCol}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Open to‑do details"
        onPress={() => router.push(`/todo/${item.id}`)}
      >
        <ThemedText
          type="defaultSemiBold"
          style={[styles.title, item.checked && styles.textChecked]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </ThemedText>
        <ThemedText
          type="default"
          style={[styles.body, item.checked && styles.textChecked]}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {item.description}
        </ThemedText>
      </TouchableOpacity>
      <View>
        <View style={styles.metaCol}>
          {!item.checked && (
            <ThemedText style={styles.timeText}>
              {formatDate(item.createdAt)}
            </ThemedText>
          )}
          {item.checkedAt && (
            <ThemedText style={styles.timeText}>
              Completed: {formatDate(item.checkedAt)}
            </ThemedText>
          )}
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Delete to‑do"
          onPress={confirmDelete}
          style={styles.deleteBtn}
        >
          <IconSymbol name="trash.fill" color={error} size={20} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    boxShadow: "1px 2px 4px rgba(0,0,0,0.1)",
    alignItems: "flex-start",
  },
  checkArea: {
    marginRight: 10,
    paddingVertical: 2,
  },
  cardChecked: {
    opacity: 0.6,
  },
  leftCol: {
    flexShrink: 1,
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  metaCol: {
    gap: 2,
    // alignItems: "flex-end",
  },
  timeText: {
    fontSize: 8,
  },
  title: {
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
  },
  textChecked: {
    textDecorationLine: "line-through",
  },
  deleteBtn: {
    alignSelf: "flex-end",
    padding: 6,
  },
});
