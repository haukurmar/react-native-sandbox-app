import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-reanimated';
import { ScrollProvider } from "./context/ScrollContext";

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ScrollProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                title: "",
              }}
            />
            <Stack.Screen
              name="+not-found"
              options={{
                title: "Oops! Page not found",
              }}
            />
          </Stack>
        </ScrollProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
