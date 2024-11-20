import { View } from "react-native";
import { Rating } from "@kolking/react-native-rating"
import Animated, { withTiming, useAnimatedStyle } from "react-native-reanimated";
import  s  from "../../styles/styleValues"
import mt from "@/styles/mtWind";
import { Image } from "react-native";

const star = require("../../assets/images/rating.png")
const smiley1 = require("../../assets/images/smiley/1.png")
const smiley2 = require("../../assets/images/smiley/2.png")
const smiley3 = require("../../assets/images/smiley/3.png")
const smiley4 = require("../../assets/images/smiley/4.png")
const smiley5 = require("../../assets/images/smiley/5.png")
const images = [smiley1, smiley2, smiley3, smiley4, smiley5]
const starFilled = require("../../assets/images/stars/filled30px.png")
const starBase = require("../../assets/images/stars/base30px.png")

interface GameRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  size?: number;
  color?: string;
}

export function GameRating({ rating, onChange, size }: GameRatingProps){
  return (
    <Rating 
      variant="emoji"
      size={30}
      spacing={0}
      rating={rating}
      baseSymbol={starBase}
      fillSymbol={starFilled}
      onChange={onChange}
      maxRating={5}
    />
  )
}

export function GameRatingBigDisplay({rating}: GameRatingProps){
  return (
    <Rating
      variant="emoji"
      size={40}
      spacing={0}
      rating={rating}
      baseSymbol={starBase}
      fillSymbol={starFilled}
      maxRating={5}
      disabled
    ></Rating>
  )
}

export function GameRatingDisplay({ rating, size = 30, color }: GameRatingProps) {
  const starStyle = useAnimatedStyle(() => {
    return {
      width: size,
      height: size,
    }
  }, [color, size])

  return (
    <View style={[mt.flexRow, mt.gap(1)]}>
      {Array.from({ length: rating }, (_, index) => (
        <Image key={index} source={starFilled} style={[mt.pxw(size), mt.pxh(size)]} />
      ))}
      {/* base for the rest */}
      {Array.from({ length: 5 - rating }, (_, index) => (
        <Image key={index} source={starBase} style={[mt.pxw(size), mt.pxh(size)]} />
      ))}
    </View>
  );
}