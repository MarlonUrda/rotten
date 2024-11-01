import { View, SafeAreaView, Text } from "react-native";
import RegisterForm from "@/components/forms/RegisterForms/registerForm";
import { generic } from "@/styles/mtWind";
import { useFonts } from "expo-font";

export default function RegisterPage() {

  const fontLoaded = useFonts({
    "poppins": require("../../assets/fonts/Poppins-Regular.ttf"),
    "poppinsBold": require("../../assets/fonts/Poppins-Bold.ttf")
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
          Registrarse
        </Text>
        <RegisterForm />
      </View>

    </SafeAreaView>
  );
}