import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
  container: {
    width: "100%",
    // flex: 1,
    flexDirection: "column",
    gap: 16,
    padding: 32,
    backgroundColor: "#2d2d2d", // bg-gray-800
    borderRadius: 8, // rounded-md
    shadowColor: "#000", // shadow-md
    shadowOffset: { width: 0, height: 2 }, // shadow-md
    shadowOpacity: 0.25, // shadow-md
    shadowRadius: 3.84, // shadow-md
    elevation: 5, // shadow-md (for Android)
  },
  placeholder: {
    color: "#757171",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff"
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
    padding: 10,
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    width: "100%",
    marginTop: 16
  },
  buttonSecondary: {
    backgroundColor: "none",
    borderRadius: 8,
    padding: 10,
    color: "#3e45c2",
    fontSize: 14,
    textAlign: "center",
    width: "100%",
    marginTop: 16
  },
  sideText: {
    width: "100%", 
    display: "flex", 
    alignItems: "flex-end", 
    borderColor: "#3b82f6", 
    color: "#3b82f6", 
  },
  text: {
    textAlign: "center",
    color: "#3b82f6", 
  },
  error: {
    color: "#ef4444",
    fontSize: 14
  }
})