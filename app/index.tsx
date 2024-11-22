import { View, SafeAreaView } from "react-native";
import { Text } from "@/components/ui/text";
import LoginForm from "@/components/forms/loginForm";
import { generic } from "@/styles/mtWind";
import { useFonts } from "expo-font";
import s from "@/styles/styleValues";
import mt from "@/styles/mtWind";
import { Redirect } from "expo-router";
import { Shadow } from "react-native-shadow-2";
import LoginView from "@/components/app/loginView";


export default function Screen() {

  return (
    <View style={[mt.flex1]}>
      <View style={[mt.flex1, mt.items("flex-start"), mt.justify("flex-start"), mt.px(4), mt.mt(16)]}>
        <LoginView />
      </View>
    </View>
  )
}
