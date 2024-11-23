import { SafeAreaView } from 'react-native'
import { Stack, Redirect } from 'expo-router'

export default function PlaylistLayout() {

  return (
    <SafeAreaView className='flex-1 items-center-justify-center'>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          animation: "slide_from_right"
        }}
      ></Stack>
    </SafeAreaView>
  )
}