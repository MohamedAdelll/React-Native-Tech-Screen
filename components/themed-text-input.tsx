import React from "react";

import {
  StyleSheet,
  TextInput,
  type TextInputProps,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export function ThemedTextInput({ style, ...rest }: TextInputProps) {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const placeholderTextColor = useThemeColor({}, "placeholderText");
  const borderColor = useThemeColor({}, "tint");

  return (
    <TextInput
      {...rest}
      placeholderTextColor={rest.placeholderTextColor ?? placeholderTextColor}
      style={[
        styles.input,
        { backgroundColor, color: textColor, borderColor },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
});
