import MovieScroll from "@/components/app/movieScroll"
import mt, { generic } from "@/styles/mtWind"
import { View, Text } from "react-native"

export default function MoviesScreen() {
  return (
    <View style={generic.safeArea}>
      <MovieScroll title="Popular"/>
    </View>
  )
}