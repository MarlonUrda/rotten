import { View, ScrollView } from "react-native";
import { Text } from "../ui/text";
import mt, { generic } from "@/styles/mtWind";
import { MoviePreview } from "./moviePreview";
import { Shadow } from "react-native-shadow-2";
import s from "@/styles/styleValues";

interface MovieScrollerProps {
  title: string;
  //movies: Movie[];
}
//This array its for the showcase tomorrow dont freak out
const testMovies = [
  { title: "Mario Kart" },
  { title: "The Legend o..." },
  { title: "Super Mario Bros" },
  { title: "Metroid" },
  { title: "Donkey Kong" },
  { title: "Kirby" },
  { title: "Star Fox" },
  { title: "Animal Crossing" },
  { title: "Splatoon" },
  { title: "Fire Emblem" },
  { title: "Pikmin" },
  { title: "Xenoblade Chronicles" }
];

const MovieScroll = ({ title }: MovieScrollerProps) => {
  return (
    <View>
      <Text style={[mt.p(4), mt.fontSize("lg"), mt.fontWeight("bold")]}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[mt.flexRow, mt.gap(5)]}>
      {testMovies.map(({ title }) => (
            <Shadow {...s.shadow.md} >
              <View key={title} style={[mt.overflow("hidden"), mt.rounded("base")]}>
                <MoviePreview title={title}/>
              </View>
            </Shadow>
        ))}
      </ScrollView>
    </View>
  )
}

export default MovieScroll;