import { useFonts } from "expo-font";
import { View, Text } from "react-native";

export default function SendResetPage() {
  const fontLoaded = useFonts({
    "poppins": require("../../assets/fonts/Poppins-Regular.ttf"),
    "poppinsBold": require("../../assets/fonts/Poppins-Bold.ttf")
  })

  if(!fontLoaded) {
    console.log("No font loaded");
  }
  return (
    <View>
      <Text>Reset Password Sent</Text>
    </View>
  );
}