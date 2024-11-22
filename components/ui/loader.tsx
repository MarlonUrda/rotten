import mt from "@/styles/mtWind";
import React from "react";
import { View } from "react-native";
import { Text } from "./text";
import { Shadow } from "react-native-shadow-2";

export default function Loader({
  size = "medium",
}: {
  size?: "small" | "medium" | "large";
}) {
  const [dots, setDots] = React.useState(".");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? "." : prevDots + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);


  const sizesText = {
    small: [mt.fontSize("sm"), mt.w(20)],
    medium: [mt.fontSize("base"), mt.w(40)],
    large: [mt.fontSize("2xl"), mt.pxw(200)],
  };

  return (
    <View style={[mt.rotate(-3)]}>
      <Shadow {...mt.shadow.mdNoRound}>
        <View
          style={[
            mt.flexRow,
            mt.justify("center"),
            mt.items("center"),
            mt.backgroundColor("yellow"),
            mt.p(2),
            mt.border(4),
          ]}
        >
          <Text
            style={[
              mt.fontWeight("black"),
              mt.color("black"),
              ...sizesText[size],
            ]}
          >
            Loading{dots}
          </Text>
        </View>
      </Shadow>
    </View>
  );
}
