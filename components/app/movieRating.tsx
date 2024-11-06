import { View } from "react-native";
import { Rating } from "@kolking/react-native-rating"
import Animated, { withTiming, useAnimatedStyle } from "react-native-reanimated";
import  s  from "../../styles/styleValues"
import mt from "@/styles/mtWind";

const star = require("../../assets/images/rating.png")

interface MovieRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  size?: number;
  color?: string;
}

export function MovieRating({ rating, onChange, size }: MovieRatingProps){
  return (
    <Rating 
      size={size}
      baseColor="#303030"
      fillColor={s.colors.yellow[900]}
      spacing={0}
      touchColor={s.colors.yellow[600]}
      rating={rating}
      baseSymbol={star}
      fillSymbol={star}
      onChange={onChange}
    />
  )
}

export function MovieRatingDisplay({ rating, size, color }: MovieRatingProps) {
  const starStyle = useAnimatedStyle(() => {
    return {
      tintColor: withTiming(color ?? s.colors.yellow[50]),
      width: size,
      height: size,
    }
  }, [color, size])

  return (
    <View style={[mt.flexCol, mt.gap(1)]}>
      {Array.from({ length: rating }, (_, index) => (
        <Animated.Image 
          key={index}
          source={star}
          style={[starStyle]}
        />
      ))}
    </View>
  )
}