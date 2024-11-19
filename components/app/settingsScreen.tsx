import { View } from 'react-native'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import UserController from '@/api/controllers/UserController'
import { Shadow } from 'react-native-shadow-2'
import mt from '@/styles/mtWind'
import s from '@/styles/styleValues'
import { CircleUserRound } from 'lucide-react-native'
import { useAtom, useSetAtom } from 'jotai'
import { userAtom } from '@/utils/atoms/userAtom'
import { UserActions } from '@/components/app/userActionsProfile'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthController from '@/api/controllers/AuthController'
import { router } from 'expo-router'
import myToast from '../toast'
import { SheetManager } from 'react-native-actions-sheet'

export default function SettingScreen() {
  const [currentUser] = useAtom(userAtom)
  const setUser = useSetAtom(userAtom)
  const queryClient = useQueryClient()

  const deleteUserMutation = useMutation({
    mutationFn: UserController.DeleteUser,
    onSuccess: () => {
      myToast({type: 'success', message: 'User deleted successfully'})
      setUser(null)
      router.push("/")
    },
    onError: (error) => {
      myToast({type: 'error', message: error.message})
    }
  })

  const onDelete = () => {
    if (currentUser)
      deleteUserMutation.mutate({_id: currentUser?._id})
  }

  const onLogout = async () => {
    queryClient.clear()
    await AuthController.logout()
    router.push("/")
  }

  const onEdit = () => {
    console.log(`${currentUser?.firstName} ${currentUser?.lastName}`)
    SheetManager.show("updateUser")
  }
  return (
    <Shadow {...mt.shadow.md}>
      <View style={[mt.flexCol, mt.items("center"), mt.gap(6), mt.backgroundColor("white"), mt.rounded("base"), mt.border(4), mt.p(5), mt.w(72)]}>
        <View style={[mt.flexCol, mt.items("center"), mt.gap(2)]}>
          <CircleUserRound size={70} style={[mt.border(4)]} color={"#000"}/>
          <Text size='lg' weight='bold'>
            {currentUser?.firstName + ' ' + currentUser?.lastName}
          </Text>
          <Text size='md'>
            {currentUser?.email}
          </Text>
        </View>
        <UserActions onDelete={onDelete} onLogOut={onLogout} onUpdate={onEdit}/>
      </View>
    </Shadow>
  )
}