import { View, Dimensions, ImageBackground, Image } from "react-native";

const bg = require("../../assets/images/bg.png");


export default function Bg() {
  const { width, height } = Dimensions.get("window");
  return (

      <ImageBackground
        source={bg}
        style={{
          width: width,
          height: height + 100,
          zIndex: -1,
          position: "absolute",
          
        }}
      />
  );
}