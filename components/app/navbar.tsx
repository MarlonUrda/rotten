import { TouchableOpacity, View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { User, UserIcon, UserRound, Search } from "lucide-react-native";
import mt from "@/styles/mtWind";
import { useRouter } from "expo-router";
import { Shadow } from "react-native-shadow-2";
import { Link } from "expo-router";

export function Navbar(){

  const router = useRouter();
  return (
    <View style={[mt.flexRow, mt.gap(3), mt.justify("flex-end"), mt.items("center")]}>
        <Button
          onPress={() => router.push("/games/search")}
        >
          <Search size={24} color={"#000"}/>
        </Button>
        
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