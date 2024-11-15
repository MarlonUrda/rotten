import { Text as RNText, TextProps } from "react-native";
import s from "@/styles/styleValues";
import mt, { MTTypes } from "@/styles/mtWind";

interface CustomTextProps extends TextProps {
    weight?: "bold" | "black" | "normal";
    size?: MTTypes["FontSize"];
}

export function Text(
    {
        weight = "normal",
        size = "md",
        ...props
    }: CustomTextProps
) {
  return (
    <RNText
    {...props}
    style={[mt.fontWeight(weight), mt.fontSize(size), mt.fontSans, props.style]}
    />
  )
}