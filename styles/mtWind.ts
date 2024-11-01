import { StyleSheet } from "react-native";
import s, { ColorShade } from "./styleValues";

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


const mt = {
  flexCol: {
    display: "flex",
    flexDirection: "column"
  },
  flexRow: {
    display: "flex",
    flexDirection: "row"
  },
  padding: (value: keyof typeof s.pixels) => ({
    padding: s.pixels[value]
  }),
  margin: (value: keyof typeof s.pixels) => ({
    margin: s.pixels[value]
  }),
  gap: (value: keyof typeof s.pixels) => ({
    gap: s.pixels[value]
  } as { gap: number }),
  borderRadius: (value: keyof typeof s.borderRadius) => ({
    borderRadius: s.borderRadius[value]
  }),
  borderWidth: (value: keyof typeof s.borderWidth) => ({
    borderWidth: s.borderWidth[value]
  }),
  fontSize: (value: keyof typeof s.font) => ({
    fontSize: s.font[value]
  }),
  fontWeight: (value: "bold" | "medium" | "light" | "black") => ({
    fontWeight: value
  }),
  items: (value: "center" | "flex-start" | "flex-end") => ({
    alignItems: value
  }),
  justify: (value: "center" | "flex-start" | "flex-end") => ({
    justifyContent: value
  }),
  w: (value: keyof typeof s.pixels) => ({
    width: s.pixels[value]
  }),
  h: (value: keyof typeof s.pixels) => ({
    height: s.pixels[value]
  }),
  backgroundColor: (value: keyof typeof s.colors, shade: ColorShade = 500, opacity: number = 1) => {
    return handleColor(value, shade, opacity, "backgroundColor")
  },
  color: (value: keyof typeof s.colors, shade: ColorShade = 500, opacity: number = 1) => {
    return handleColor(value, shade, opacity, "color")
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