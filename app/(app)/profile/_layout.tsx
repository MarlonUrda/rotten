import { SafeAreaView } from 'react-native'
import { Stack, Redirect } from 'expo-router'
import { userAtom } from '@/utils/atoms/userAtom'
import { useAtomValue } from 'jotai'

export default function Profile() {
  const user = useAtomValue(userAtom)

  if (!user) {
    return <Redirect href="/" />
  }

  return (
    <SafeAreaView className='flex-1 items-center-justify-center'>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          animation: "default"
        }}
      ></Stack>
    </SafeAreaView>
  )
}