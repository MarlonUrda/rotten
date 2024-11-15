import { MTTypes } from "@/styles/mtWind";
import { View } from "react-native";
import mt from "@/styles/mtWind";
import { Text } from "./text";
import { Shadow } from "react-native-shadow-2";

export function Title({ title, color, size, shadow }: { title: string; color: MTTypes["Color"], size?: MTTypes["FontSize"], shadow?: boolean }) {
  return (
    <View
      style={[
        mt.rotate(-3),
      ]}
    >
      {shadow ? (
        <Shadow
          {...mt.shadow.mdNoRound}
        >
          <TitleInner title={title} color={color} size={size} shadow={shadow} />
        </Shadow>
      ) : (
        <TitleInner title={title} color={color} size={size} shadow={shadow} />
      )}

    </View>
  );
}

function TitleInner({ title, color, size, shadow }: { title: string; color: MTTypes["Color"], size?: MTTypes["FontSize"], shadow?: boolean }) {
  return (
    <View
      style={[
        mt.p(1),
        mt.px(2),
        mt.border(2),
        mt.backgroundColor(color),
        // mt.rotate(-3),
      ]}
    >
      <Text size={size ?? "lg"} weight="black" style={[mt.fontWeight("bold")]}>
        {title}
      </Text>
    </View>
  );
}
