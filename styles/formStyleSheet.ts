import { StyleSheet } from "react-native";
import styleValues from "./styleValues";

export const formStyles = StyleSheet.create({
  container: {
    width: styleValues.pixels.full,
    flexDirection: "column",
    gap: styleValues.pixels[4],
    padding: styleValues.pixels[4],
    backgroundColor: "transparent",
    borderRadius: styleValues.borderRadius.base,  
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: styleValues.pixels[2],
  },
  inputLabel: {
    fontSize: styleValues.font.base,
    fontWeight: "500",
    fontFamily: "poppinsBold",
    color: "#000",
  },
  input: {
    color: "#000",
    backgroundColor: "#D3D3D3",
    height: styleValues.pixels[10],
    padding: styleValues.pixels[1],
    borderWidth: styleValues.borderWidth[2],
    borderRadius: styleValues.borderRadius.base, 
    fontFamily: styleValues.fontFamily.sans
  },
  inputFocus: {
    borderWidth: styleValues.borderWidth[4],
    backgroundColor: styleValues.colors.purple[100]
  },
  button: {
    backgroundColor: styleValues.colors.blue[500],
    borderRadius: styleValues.borderRadius.base,
    borderWidth: 3,
    borderColor: "#000",   
    padding: 10,
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    width: "100%",
    fontFamily: styleValues.fontFamily.sans,
  },
  buttonSecondary: {
    backgroundColor: "none",
    borderRadius: 8,
    padding: 10,
    color: "#3e45c2",
    fontSize: 14,
    textAlign: "center",
    width: "100%",
    marginTop: 16,
    fontFamily: styleValues.fontFamily.sans,
  },
  sideText: {
    width: "100%", 
    display: "flex", 
    alignItems: "flex-end", 
    borderColor: styleValues.colors.purple[500], 
    color: "#3b82f6", 
    fontFamily: styleValues.fontFamily.sans
  },
  text: {
    textAlign: "center",
    color: styleValues.colors.purple[500],
    fontFamily: styleValues.fontFamily.sans 
  },
  error: {
    color: styleValues.colors.red[500],
    fontSize: styleValues.font.base,
    fontFamily: styleValues.fontFamily.sans,
  }
})

export const genericStyles = StyleSheet.create({
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    gap: styleValues.pixels[4],
  }
})