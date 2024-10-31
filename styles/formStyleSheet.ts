import { StyleSheet } from "react-native";
import s from "./styleValues";

export const formStyles = StyleSheet.create({
  container: {
    width: s.pixels.full,
    flexDirection: "column",
    gap: s.pixels[4],
    padding: s.pixels[4],
    backgroundColor: "transparent",
    borderRadius: s.borderRadius.base,  
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: s.pixels[2],
  },
  inputLabel: {
    fontSize: s.font.base,
    fontWeight: "500",
    color: "#000",
  },
  input: {
    color: "#000",
    backgroundColor: "#D3D3D3",
    height: s.pixels[10],
    padding: s.pixels[1],
    borderWidth: s.borderWidth[2],
    borderRadius: s.borderRadius.base, 
    fontFamily: s.fontFamily.sans
  },
  inputFocus: {
    borderWidth: s.borderWidth[4],
    backgroundColor: s.colors.purple[100]
  },
  button: {
    backgroundColor: s.colors.blue[500],
    borderRadius: s.borderRadius.base,
    borderWidth: 3,
    borderColor: "#000",   
    padding: 10,
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    width: "100%",
    fontFamily: s.fontFamily.sans,
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
    fontFamily: s.fontFamily.sans,
  },
  sideText: {
    width: "100%", 
    display: "flex", 
    alignItems: "flex-end", 
    borderColor: s.colors.purple[500], 
    color: "#3b82f6", 
    fontFamily: s.fontFamily.sans
  },
  text: {
    textAlign: "center",
    color: s.colors.purple[500],
    fontFamily: s.fontFamily.sans 
  },
  error: {
    color: s.colors.red[500],
    fontSize: s.font.base,
    fontFamily: s.fontFamily.sans,
  }
})

export const genericStyles = StyleSheet.create({
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    gap: s.pixels[4],
  }
})