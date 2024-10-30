import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    gap: 16,
    padding: 32,
    backgroundColor: "transparent",
    borderRadius: 8,  
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 6
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "poppinsBold",
    color: "#000"
  },
  input: {
    color: "#fff",
    backgroundColor: "#D3D3D3",
    height: 40,
    padding: 4,
    borderWidth: 2,
    borderRadius: 8, 
    fontFamily: "poppins"
  },
  inputFocus: {
    shadowColor: "rgba(0,0,0,1)",
    borderWidth: 3,
    backgroundColor: "#FFA6F6"
  },
  button: {
    backgroundColor: "#3e45c2",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#000",   
    padding: 10,
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    width: "100%",
    fontFamily: "poppins",
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
    fontFamily: "poppins",
  },
  sideText: {
    width: "100%", 
    display: "flex", 
    alignItems: "flex-end", 
    borderColor: "#3b82f6", 
    color: "#3b82f6", 
    fontFamily: "poppins"
  },
  text: {
    textAlign: "center",
    color: "#3b82f6",
    fontFamily: "poppins" 
  },
  error: {
    color: "#ef4444",
    fontSize: 14,
    fontFamily: "poppins"
  }
})