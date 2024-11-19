import { TouchableOpacity, View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { User, UserIcon, UserRound } from "lucide-react-native";
import mt from "@/styles/mtWind";
import { router } from "expo-router";
import { Shadow } from "react-native-shadow-2";

export function Navbar(){
  return (
    <View style={[mt.flexRow, mt.gap(3), mt.justify("flex-end"), mt.items("center")]}>
      <Button>
        <Text weight="bold">
          Playlist
        </Text>
      </Button>
      <Shadow {...mt.shadow.md}>
        <TouchableOpacity onPress={() => router.push("/profile")} style={[mt.border(2), mt.rounded("base"), mt.backgroundColor("white")]}>
          <UserRound size={32} color={"#000"}/>
        </TouchableOpacity>
      </Shadow>
    </View>
  )
}