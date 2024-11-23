import { View } from "react-native";
import mt from "@/styles/mtWind";
import ChangeScreen from "@/components/app/changePasswordScreen";

export default function ChangePasswordPage() {

  return (
    <View style={[mt.flex1]}>
      <View
        style={[
          mt.flex1,
          mt.items("center"),
          mt.justify("flex-start"),
          mt.mt(16),
          mt.px(4),
          mt.overflow("visible"),
        ]}
      >
        <ChangeScreen />
      </View>
    </View>
  );
}