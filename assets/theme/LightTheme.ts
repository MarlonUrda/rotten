import { DefaultTheme } from "@react-navigation/native";

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
    text: "#000000",
    primary: "#6200ee",
    card: "#f8f9fa",
    border: "#c7c7c7",
    notification: "#ff80ab",
  },
};

export default LightTheme;