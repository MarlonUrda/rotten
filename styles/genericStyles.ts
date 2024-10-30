import { StyleSheet } from "react-native";

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
  }
})