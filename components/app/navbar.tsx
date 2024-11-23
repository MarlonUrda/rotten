import { View } from "react-native";
import { Button } from "../ui/button";
import mt from "@/styles/mtWind";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function Navbar(){

  const router = useRouter();
  return (
    <View style={[mt.flexRow, mt.gap(3), mt.justify("flex-end"), mt.items("center")]}>
        <Button
          onPress={() => router.push("/games/search")}
        >
          <MaterialCommunityIcons name="magnify" size={24} color={"#000"} />
        </Button>
        <Button variant="success" onPress={() => router.push("/profile")}>
        <View style={[mt.flexRow, mt.gap(2)]}>
          <MaterialCommunityIcons name="account" size={24} color={"#000"} />
        </View>
      </Button>
    </View>
  )
}