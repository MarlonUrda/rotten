import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { useFonts } from 'expo-font'
import { Stack } from "expo-router";
import { Toaster } from 'sonner-native'
import { SheetProvider } from 'react-native-actions-sheet'
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import "react-native-reanimated"
import "@/global.css"
import LightTheme from "@/assets/theme/LightTheme";

const queryClient = new QueryClient()

export default function RootLayout() {

  return (
    <QueryClientProvider client={queryClient}>
      <SheetProvider>
        <ThemeProvider value={LightTheme}>
          <GestureHandlerRootView>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "simple_push",
                contentStyle: {
                  backgroundColor:"#68fa48"
                }
              }}
            ></Stack>
            <Toaster richColors position="bottom-center"/>
          </GestureHandlerRootView>
        </ThemeProvider>
      </SheetProvider>
    </QueryClientProvider>
  )

}