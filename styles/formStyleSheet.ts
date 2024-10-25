import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    gap: 16,
    padding: 32,
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  placeholder: {
    color: "#757171",
  },
  input: {
    color: "#fff",
    backgroundColor: "#D3D3D3",
    height: 40,
    padding: 4
  },
  inputFocus: {
    borderColor: "#3e45c2"
  },
  button: {
    backgroundColor: "#3e45c2",
    borderRadius: 8,
    padding: 16,
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    width: "50%"
  }
})