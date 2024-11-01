import { View, SafeAreaView } from "react-native";
import { Text } from "@/components/ui/text";
import LoginForm from "@/components/forms/loginForm";
import { generic } from "@/styles/mtWind";
import { useFonts } from "expo-font";
import s from "@/styles/styleValues";

export default function Screen() {

  return (
    <SafeAreaView style={generic.safeArea}>
      <View style={generic.headerContainer}>
        <Text style={[generic.h1, {
          fontFamily: s.fontFamily.sansBlack,
        }]}>
          Rotten Minds
        </Text>
        <Text style={generic.h3}>
          Inicio de sesion
        </Text>
      </View>

      <View style={generic.formwrapper}>
        <LoginForm />
      </View>
    </SafeAreaView>
  )
}
