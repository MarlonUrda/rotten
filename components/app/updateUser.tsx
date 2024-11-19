import ActionSheet from "react-native-actions-sheet"
import mt from "@/styles/mtWind"
import UpdateUserForm from "../forms/updateUserForm"
import { View } from "react-native"

export default function UpdateUser() {
  return (
    <ActionSheet
      gestureEnabled
      containerStyle={{
        position: "relative"
      }}
    >
      <View style={[mt.p(8), mt.pt(1)]}>
        <UpdateUserForm />
      </View>
    </ActionSheet>
  )
}