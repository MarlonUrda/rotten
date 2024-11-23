import ActionSheet from "react-native-actions-sheet"
import mt from "@/styles/mtWind"
import UpdateUserForm from "../forms/updateUserForm"
import { View } from "react-native"
import s from "@/styles/styleValues";

export default function UpdateUser() {
  return (
    <ActionSheet
      isModal={false}
      gestureEnabled
      containerStyle={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTopWidth: s.borderWidth[4],
      }}
    >
      <View style={[mt.p(8), mt.pt(1)]}>
        <UpdateUserForm />
      </View>
    </ActionSheet>
  );
}