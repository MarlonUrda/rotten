import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { Toaster } from 'sonner-native'
import { SheetProvider } from 'react-native-actions-sheet'
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { HoldMenuProvider } from "react-native-hold-menu"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import "react-native-reanimated"
import "@/global.css"
import LightTheme from "@/assets/theme/LightTheme";
import {
  useFonts as useLexend,
  Lexend_100Thin,
  Lexend_200ExtraLight,
  Lexend_300Light,
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
  Lexend_800ExtraBold,
  Lexend_900Black,
} from '@expo-google-fonts/lexend';
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import s from "@/styles/styleValues";

const queryClient = new QueryClient()

export default function RootLayout() {
  const insets = useSafeAreaInsets()
  let [fontsLoaded] = useLexend({
    Lexend_100Thin,
    Lexend_200ExtraLight,
    Lexend_300Light,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
    Lexend_800ExtraBold,
    Lexend_900Black,
  });

  if (!fontsLoaded){
    console.log("Fonts not loaded")
    return <View>
      <Text>Loading...</Text>
    </View>
  }



  return (
    <QueryClientProvider client={queryClient}>
      <SheetProvider>
        <ThemeProvider value={LightTheme}>
          <HoldMenuProvider theme="light" safeAreaInsets={insets}>  
            <GestureHandlerRootView>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: "simple_push",
                  contentStyle: {
                    backgroundColor:s.colors.background
                  }
                }}
              ></Stack>
              <Toaster richColors position="bottom-center"/>
            </GestureHandlerRootView>
          </HoldMenuProvider>
        </ThemeProvider>
      </SheetProvider>
    </QueryClientProvider>
  )

}