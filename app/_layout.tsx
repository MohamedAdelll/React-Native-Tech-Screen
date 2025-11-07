import "react-native-reanimated";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TodoProvider } from "@/contexts/todo-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <TodoProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="todo/[id]" options={{ headerShown: false }} />
          <Stack.Screen
            name="todo/create"
            options={{
              presentation: "modal",
              title: "New To-Do",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </TodoProvider>
    </ThemeProvider>
  );
}
