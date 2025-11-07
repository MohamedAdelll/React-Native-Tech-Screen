import React from "react";

import { router } from "expo-router";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

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
  const ERROR_RED = "#ff4d4f";
  const tint = useThemeColor({}, "tint");

  const { addTodo } = useTodos();
  const { getTextInputProps, errors, touched, handleSubmit } = useForm({
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
          style={[
            touched.title && errors.title ? { borderColor: ERROR_RED } : null,
          ]}
        />
        {!!(touched.title && errors.title) && (
          <ThemedText style={styles.errorText} accessibilityLiveRegion="polite">
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
            touched.body && errors.body ? { borderColor: ERROR_RED } : null,
          ]}
        />
        {!!(touched.body && errors.body) && (
          <ThemedText style={styles.errorText} accessibilityLiveRegion="polite">
            {errors.body}
          </ThemedText>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.button, { backgroundColor: tint }]}
        activeOpacity={0.85}
      >
        <ThemedText type="defaultSemiBold" style={styles.buttonText}>
          Add To‑Do
        </ThemedText>
      </TouchableOpacity>
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
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 12,
  },
});
