import { View } from "react-native";
import mt from "@/styles/mtWind";
import { useFonts } from "expo-font";
import RegisterScreen from "@/components/app/registerScreen";
import Bg from "@/components/app/Bg";

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
      <View
        style={[
          mt.flex1,
          mt.items("flex-start"),
          mt.justify("flex-start"),
          mt.mt(16),
          mt.px(4),
          mt.overflow("visible")
        ]}
      >
        <RegisterScreen />
      </View>
      <Bg />
    </View>
  );
}