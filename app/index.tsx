import { View, Text, SafeAreaView } from "react-native";
import LoginForm from "@/components/forms/loginForm";
import { generic } from "@/styles/genericStyles";
import { useFonts } from "expo-font";

export default function Screen() {

  const fontLoaded = useFonts({
    "poppins": require("../assets/fonts/Poppins-Regular.ttf"),
    "poppinsBold": require("../assets/fonts/Poppins-Bold.ttf")
  })

  if(!fontLoaded) {
    console.log("No font loaded");
  }

  return (
    <SafeAreaView style={generic.safeArea}>
      <View style={generic.headerContainer}>
        <Text style={generic.h1}>
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
