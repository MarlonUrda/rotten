import { View } from "react-native";
import { Text } from "../ui/text";
import { Cat } from "lucide-react-native";
import { Shadow } from "react-native-shadow-2";
import mt from "@/styles/mtWind";
import s from "@/styles/styleValues";

export function EmptyCommentsSplash(){
  return (
    <View style={[mt.flexCol, mt.items("center"), mt.justify("center"), mt.gap(4), mt.h("full")]}>
      <Shadow {...s.shadow.md}>
        <View style={[mt.h(44), mt.w(60), mt.backgroundColor("yellow"), mt.rounded("base"), mt.items("center"), mt.justify("center"), mt.gap(2), mt.border(4)]}>
          <Cat size={32} color={"#000"}/>
          <Text size="lg" weight="bold">No hay comentarios!</Text>
          <Text size="md" weight="normal">Se el primero en comentar</Text>
        </View>
      </Shadow>
    </View>
  )
}