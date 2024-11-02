import MovieScroll from "@/components/app/movieScroll"
import mt, { generic } from "@/styles/mtWind"
import { View, Text } from "react-native"

export default function MoviesScreen() {
  return (
    <View style={[mt.pt(12), mt.p(2)]}>
      <MovieScroll title="Popular"/>
    </View>
  )
}