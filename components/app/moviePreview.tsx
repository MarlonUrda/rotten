import { Button } from "../ui/button";
import { Text } from "../ui/text";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { View } from "react-native";
import { Image } from "react-native-elements"
import mt from "@/styles/mtWind";
import { Shadow } from "react-native-shadow-2";
import { TouchableOpacity } from "react-native-gesture-handler";
import s from "@/styles/styleValues";
import { ActivityIndicator } from "react-native";
import { useState } from "react";

interface MoviePreviewProps {
  title: string;
  //   posterUrl: string;
  //   critiqueRating: number;
  //   publicRating: number;
}

export function MoviePreview({ title }: MoviePreviewProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <View
      style={[
        mt.flexCol,
        mt.gap(4),
        mt.rounded("base"),
        mt.border(2),
        mt.backgroundColor("white"),
        mt.w(48),
        mt.p(4),
      ]}
    >
      <TouchableOpacity>
        <View>
          <Image
            source={require("../../assets/images/adaptive-icon.png")}
            style={{ height: 200, width: "100%", resizeMode: "cover" }}
          />
        </View>
      </TouchableOpacity>
      <View style={[mt.flexRow, mt.justify("space-between")]}>
        <View style={[mt.flexRow, mt.gap(1)]}>
          <Image
            source={require("../../assets/images/icon1.png")}
            style={{ height: 16, width: 16, resizeMode: "contain", marginTop: 3 }}
          />
          <Text weight="bold">87%</Text>
        </View>
        <View style={[mt.flexRow, mt.gap(1)]}>
          <Image
            source={require("../../assets/images/icon2.png")}
            style={{ height: 16, width: 16, resizeMode: "contain", marginTop: 3}}
          />
          <Text weight="bold">76%</Text>
        </View>
      </View>
      <Text size="md" weight="normal">
        {title}
      </Text>

      <View>
        <Button variant="primary" onPress={() => console.log(`Pelicula ${title} agregada`)} >
          <Text weight="bold" size="md">
            Agregar
          </Text>
        </Button>
      </View>
    </View>
  );
}
