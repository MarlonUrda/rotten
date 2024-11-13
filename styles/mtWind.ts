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
type Color = keyof typeof s.colors;

export type MTTypes = {
  Color: Color;
  Pixels: Pixels;
  AbsolutePixels: AbsolutePixels;
  Font: Font;
  FontWeight: FontWeight;
  FontSize: FontSize;
}

const mt = {
  flex: {
    display: "flex"
  },
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
  flexWrap: {
    flexWrap: "wrap"
  },
  align: (value: "center" | "left" | "right" | "auto") => ({
    textAlign: value
  }),
  bottom: (value: Pixels) => ({
    bottom: s.pixels[value]
  }),
  p: (value: AbsolutePixels) => ({
    padding: s.pixels[value]
  }),
  pt: (value: AbsolutePixels) => ({
    paddingTop: s.pixels[value]
  }),
  pb: (value: AbsolutePixels) => ({
    paddingBottom: s.pixels[value]
  }),
  pl: (value: AbsolutePixels) => ({
    paddingLeft: s.pixels[value]
  }),
  pr: (value: AbsolutePixels) => ({
    paddingRight: s.pixels[value]
  }),
  position: (value: "absolute" | "relative") => ({
    position: value
  }),
  py: (value: AbsolutePixels) => ({
    paddingVertical: s.pixels[value]
  }),
  px: (value: AbsolutePixels) => ({
    paddingHorizontal: s.pixels[value]
  }),
  top: (value: Pixels) => ({
    top: s.pixels[value]
  }),
  left: (value: Pixels) => ({
    left: s.pixels[value]
  }),
  right: (value: Pixels) => ({
    right: s.pixels[value]
  }),
  m: (value: AbsolutePixels) => ({
    margin: s.pixels[value]
  }),
  mt: (value: AbsolutePixels) => ({
    marginTop: s.pixels[value]
  }),
  mb: (value: AbsolutePixels) => ({
    marginBottom: s.pixels[value]
  }),
  ml: (value: AbsolutePixels) => ({
    marginLeft: s.pixels[value]
  }),
  mr: (value: AbsolutePixels) => ({
    marginRight: s.pixels[value]
  }),
  gap: (value: AbsolutePixels) => ({
    gap: s.pixels[value]
  }),
  resize: (value: "contain" | "center" | "cover" | "repeat" | "stretch") => ({
    resizeMode: value
  }),
  rounded: (value: keyof typeof s.borderRadius) => ({
    borderRadius: s.borderRadius[value]
  }),
  border: (value: keyof typeof s.borderWidth) => ({
    borderWidth: s.borderWidth[value]
  }),
  borderBottom: (value: keyof typeof s.borderWidth) => ({
    borderBottomWidth: s.borderWidth[value]
  }),
  fontSize: (value: FontSize) => ({
    fontSize: s.font[value]
  }),
  z: (value: number) => ({
    zIndex: value
  }),
  fontWeight: (value: "bold" | "black" | "normal") => {
    switch (value) {
      case "bold":
        return {
          fontFamily: s.fontFamily.sansBold
        }
      case "black":
        return {
          fontFamily: s.fontFamily.sansBlack
        }
      default:
        return {
          fontFamily: s.fontFamily.sans
        }
    }
  },
  rotate: (value: number) => ({
    transform: [{ rotate: `${value}deg` }]
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
  pxw: (value: number) => ({
    width: value
  }),
  h: (value: Pixels) => ({
    height: s.pixels[value]
  }),
  pxh: (value: number) => ({
    height: value
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
  inset: (value: Pixels) => ({
    top: s.pixels[value],
    left: s.pixels[value],
    right: s.pixels[value],
    bottom: s.pixels[value]
  }),
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