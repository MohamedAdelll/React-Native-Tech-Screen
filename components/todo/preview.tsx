import {
  StyleSheet,
  View,
} from "react-native";

import type { Todo } from "@/types/todo";
import { formatDate } from "@/utils/date";

import { ThemedText } from "../themed-text";

export default function Preview({ item }: { item: Todo }) {
  return (
    <View style={styles.card}>
      <View>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {item.title}
        </ThemedText>
        <ThemedText type="default" style={styles.body}>
          {item.description}
        </ThemedText>
      </View>
      <View style={styles.cardTime}>
        <ThemedText style={styles.time}>
          {formatDate(item.createdAt)}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
  },
  cardTime: {
    marginLeft: "auto",
  },
  time: {
    fontSize: 8,
  },
  title: {
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
  },
});
