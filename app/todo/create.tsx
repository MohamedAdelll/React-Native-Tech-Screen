import React from "react";

import { router } from "expo-router";
import {
  StyleSheet,
  View,
} from "react-native";

import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-text-input";
import { ThemedView } from "@/components/themed-view";
import { useTodos } from "@/contexts/todo-context";
import {
  required,
  useForm,
} from "@/hooks/use-form";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function ModalScreen() {
  const errorColor = useThemeColor({}, "error");

  const { addTodo } = useTodos();
  const { getTextInputProps, errors, handleSubmit } = useForm({
    initialValues: { title: "", body: "" },
    config: {
      title: { validate: required("Title") },
      body: { validate: required("Body") },
    },
    onSubmit: (values) => {
      addTodo({ title: values.title.trim(), description: values.body.trim() });
      router.back();
    },
  });

  const shouldShowBodyError = errors.body;
  const shouldShowTitleError = errors.title;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.inputContainer}>
        <ThemedText type="subtitle" style={styles.label}>
          Title
        </ThemedText>
        <ThemedTextInput
          {...getTextInputProps("title")}
          placeholder="Enter title"
          accessibilityLabel="Todo title"
          style={[shouldShowTitleError ? { borderColor: errorColor } : null]}
        />
        {shouldShowTitleError && (
          <ThemedText
            style={[styles.errorText, { color: errorColor }]}
            accessibilityLiveRegion="polite"
          >
            {errors.title}
          </ThemedText>
        )}
      </View>
      <View style={styles.inputContainer}>
        <ThemedText type="subtitle" style={styles.label}>
          Body
        </ThemedText>
        <ThemedTextInput
          {...getTextInputProps("body")}
          placeholder="Enter details"
          multiline
          numberOfLines={4}
          accessibilityLabel="Todo body"
          style={[
            styles.textArea,
            shouldShowBodyError ? { borderColor: errorColor } : null,
          ]}
        />
        {shouldShowBodyError && (
          <ThemedText
            style={[styles.errorText, { color: errorColor }]}
            accessibilityLiveRegion="polite"
          >
            {errors.body}
          </ThemedText>
        )}
      </View>

      <ThemedButton
        title="Add To‑Do"
        onPress={handleSubmit}
        style={styles.button}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  inputContainer: {
    width: "100%",
    marginTop: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 12,
  },
});
