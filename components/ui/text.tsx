import { Text as RNText, TextProps } from "react-native";
import s from "@/styles/styleValues";
import mt from "@/styles/mtWind";

interface CustomTextProps extends TextProps {
    weight?: "bold" | "black" | "normal";
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
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