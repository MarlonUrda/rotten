import { ImageStyle, StyleSheet, TextStyle } from "react-native";
import s, { ColorShade } from "./styleValues";
import { ViewStyle } from "@expo/html-elements/build/primitives/View";

export const generic = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "column",
    gap: 4,
    width: "100%",
    alignItems: "center",
    padding: 4,
    paddingTop: 80
  },
  h1: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8
  },
  h2: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6
  },
  h3: {
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 4
  },
  formwrapper: {
    height: "50%",
    padding: 16,
    borderRadius: 8,
    // backgroundColor: "#2d2d2d",
    width: "100%"
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    gap: s.pixels[4],
  }
  //
})



type Pixels = keyof typeof s.pixels;
type AbsolutePixels = Exclude<Pixels, "full" | "half" | "third">;
type Font = keyof typeof s.font;
type FontWeight = "bold" | "medium" | "light" | "black";
type FontSize = Exclude<Font, "bold" | "medium" | "light" | "black" | "normal" | "italic">;

const mt = {
  flexCol: {
    display: "flex",
    flexDirection: "column"
  },
  flexRow: {
    display: "flex",
    flexDirection: "row"
  },
  flex1: {
    flex: 1
  },
  p: (value: AbsolutePixels) => ({
    padding: s.pixels[value]
  }),
  pt: (value: AbsolutePixels) => ({
    paddingTop: s.pixels[value]
  }),
  pb: (value: AbsolutePixels) => ({
    paddingBottom: s.pixels[value]
  }),
  pv: (value: AbsolutePixels) => ({
    paddingVertical: s.pixels[value]
  }),
  m: (value: AbsolutePixels) => ({
    margin: s.pixels[value]
  }),
  gap: (value: AbsolutePixels) => ({
    gap: s.pixels[value]
  }),
  rounded: (value: keyof typeof s.borderRadius) => ({
    borderRadius: s.borderRadius[value]
  }),
  border: (value: keyof typeof s.borderWidth) => ({
    borderWidth: s.borderWidth[value]
  }),
  fontSize: (value: FontSize) => ({
    fontSize: s.font[value]
  }),
  fontWeight: (value: "bold" | "black" | "normal") => ({
    fontWeight: s.font[value]
  }),
  items: (value: "center" | "flex-start" | "flex-end") => ({
    alignItems: value
  }),
  justify: (value: "center" | "flex-start" | "flex-end" | "space-between") => ({
    justifyContent: value
  }),
  w: (value: Pixels) => ({
    width: s.pixels[value]
  }),
  h: (value: Pixels) => ({
    height: s.pixels[value]
  }),
  overflow: (value: "hidden" | "scroll" | "visible") => ({
    overflow: value
  }),
  backgroundColor: (value: keyof typeof s.colors, shade: ColorShade = 500, opacity: number = 1) => {
    return handleColor(value, shade, opacity, "backgroundColor")
  },
  color: (value: keyof typeof s.colors, shade: ColorShade = 500, opacity: number = 1) => {
    return handleColor(value, shade, opacity, "color")
  },
  fontSans: {
    fontFamily: s.fontFamily.sans
  },
  italics: {
    fontStyle: "italic"
  },
  underline: {
    textDecorationLine: "underline"
  },
  shadow: s.shadow
} as const;

export default mt;


function handleColor(value: keyof typeof s.colors, shade: ColorShade = 500, opacity: number = 1, key: "color" | "backgroundColor" = "color") {
  if (typeof s.colors[value] === "object") {
    if (value.endsWith("Opacity")) {
      const func = s.colors[value][shade] as (opacity: number) => string
      return {
        [key]: func(opacity)
      }
    }
    return {
      [key]: s.colors[value][shade]
    }
  }
  return {
    [key]: s.colors[value]
  }
}