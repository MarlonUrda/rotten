import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { ActivityIndicator, View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import mt from "@/styles/mtWind";
import { useAtom } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";
import { useMutation } from "@tanstack/react-query";
import UserController from "@/api/controllers/UserController";
import myToast from "../toast";
import { router } from "expo-router";
import { CircleMinus } from "lucide-react-native";

export default function DeleteAccountSheet(){
  const [currentUser, setUser] = useAtom(userAtom)

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

  const deleteAccount = () => {
    if (currentUser) deleteUserMutation.mutate({ _id: currentUser._id })
    SheetManager.hide("deleteUser")
  }

  return (
    <ActionSheet
      gestureEnabled
      containerStyle={{
        position: "relative",
      }}
    >
      <View style={[mt.p(8), mt.pt(0), mt.w("full")]}>
        <View style={[mt.flexCol, mt.gap(4), mt.p(4), mt.items("center"), mt.w("full")]}>
          <Text size="2xl" weight="bold" style={[mt.align("center")]}>
            Delete Account
          </Text>
          <Text size="md" style={[mt.align("center"), mt.mt(4), mt.border(2), mt.p(4)]}>
            Are you sure you want to delete your account? 
            This action cannot be undone. This will delete 
            all your data and you will not be able to recover it.
          </Text>
          <Button variant="error" onPress={deleteAccount}>
            {deleteUserMutation.isPending ? (
              <ActivityIndicator color={"#000"} size={"small"}/>
            ): (
              <View style={[mt.flexRow, mt.gap(2)]}>
                <CircleMinus color={"#000"}/>
                <Text>Delete Account</Text>
              </View>
            )}
          </Button>
          <Button variant="secondary" onPress={() => SheetManager.hide("deleteUser")}>
            <Text>
              Cancel
            </Text>
          </Button>
        </View>
      </View>
    </ActionSheet>
  )
}