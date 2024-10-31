import { Text as RNText, TextProps } from "react-native";
import s from "@/styles/styleValues";

interface CustomTextProps extends TextProps {
    weight?: "bold" | "black" | "normal";
}

export function Text(
    {
        weight = "normal",
        ...props
    }: CustomTextProps
) {
  return (
    <RNText
      style={{
        ...(typeof props.style === 'object' ? props.style : {}),
        fontFamily: s.fontFamily.sans,
      }}
      {...props}
    />
  )
}