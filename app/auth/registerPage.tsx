import { View, SafeAreaView, Text } from "react-native";
import RegisterForm from "@/components/forms/RegisterForms/registerForm";
import { generic } from "@/styles/genericStyles";

export default function RegisterPage() {
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