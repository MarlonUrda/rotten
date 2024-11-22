import { View } from "react-native";
import mt from "@/styles/mtWind";
import { useFonts } from "expo-font";
import RegisterScreen from "@/components/app/registerScreen";

export default function RegisterPage() {

  const fontLoaded = useFonts({
    "poppins": require("../../assets/fonts/Poppins-Regular.ttf"),
    "poppinsBold": require("../../assets/fonts/Poppins-Bold.ttf")
  })

  if(!fontLoaded) {
    console.log("No font loaded");
  }

  return (
    <View style={[mt.flex1]}>
      <View style={[mt.flex1, mt.items("center"), mt.justify("center")]}>
        <RegisterScreen />
      </View>
    </View>
  );
}