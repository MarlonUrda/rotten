import { Text as RNText, TextProps } from "react-native";
import styleValues from "@/styles/styleValues";

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
        fontFamily: styleValues.fontFamily.sans,
      }}
      {...props}
    />
  )
}