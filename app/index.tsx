import { View, Text, SafeAreaView } from "react-native";
import LoginForm from "@/components/forms/loginForm";
import { generic } from "@/styles/genericStyles";

export default function Screen() {
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
