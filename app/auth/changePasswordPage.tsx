import { View } from "react-native";
import mt from "@/styles/mtWind";
import ChangePasswordForm from "@/components/forms/changePassword/changePasswordForm";

export default function ChangePasswordPage() {

  return (
    <View style={[mt.flex1]}>
      <View style={[mt.flex1, mt.items("center"), mt.justify("center")]}>
        <ChangePasswordForm />
      </View>
    </View>
  );
}