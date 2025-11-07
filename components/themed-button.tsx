import React from "react";

import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";

type ThemedButtonProps = TouchableOpacityProps & {
  title?: string;
};

export function ThemedButton({
  title,
  onPress,
  style,
  disabled,
  accessibilityLabel,
  ...rest
}: ThemedButtonProps) {
  const tint = useThemeColor({}, "tint");
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: tint, opacity: disabled ? 0.6 : 1 },
        style,
      ]}
      activeOpacity={rest.activeOpacity ?? 0.85}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      disabled={disabled}
      {...rest}
    >
      <ThemedText type="defaultSemiBold" style={styles.buttonText}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
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
});
