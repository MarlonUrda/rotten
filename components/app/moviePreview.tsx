import { Button } from "../ui/button";
import { Text } from "../ui/text";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { View, Image } from "react-native";
import mt from "@/styles/mtWind";
import { Shadow } from "react-native-shadow-2";
import { TouchableOpacity } from "react-native-gesture-handler";
import s from "@/styles/styleValues";

interface MoviePreviewProps {
  title: string;
  //   posterUrl: string;
  //   critiqueRating: number;
  //   publicRating: number;
}

export function MoviePreview({ title }: MoviePreviewProps) {
  return (
    <View
      style={[
        mt.flexCol,
        mt.gap(4),
        mt.borderRadius("base"),
        mt.borderWidth(2),
        mt.backgroundColor("white")
      ]}
    >
      <TouchableOpacity>
        <View>
          <Image
            source={{ uri: "../../assets/images/react-logo@2x.png" }}
            style={{ height: 200, width: "100%", resizeMode: "cover" }}
          />
        </View>
      </TouchableOpacity>
      <View style={[mt.flexRow, mt.justify("space-between")]}>
        <View style={[mt.flexRow]}>
          <Image
            source={{ uri: "../../assets/images/icon1.png" }}
            style={{ height: 24, width: 24, resizeMode: "contain" }}
          />
          <Text weight="bold">87%</Text>
        </View>
        <View style={[mt.flexRow]}>
          <Image
            source={{ uri: "../../assets/images/icon2.png" }}
            style={{ height: 24, width: 24, resizeMode: "contain" }}
          />
          <Text weight="bold">76%</Text>
        </View>
      </View>
      <Text size="md" weight="normal">
        {title}
      </Text>

      <View>
        <Button variant="primary" onPress={() => console.log("Hola")} style={[mt.w("half")]}>
          <Text weight="bold" size="md">
            Agregar a tu Lista
          </Text>
        </Button>
      </View>
    </View>
  );
}
