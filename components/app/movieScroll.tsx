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
  { title: "Xenoblade Chronicles" },
];

const MovieScroll = ({ title }: MovieScrollerProps) => {
  return (
    <View>
      <Text style={[mt.p(4)]} size="xl" weight="black">
        {title}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          mt.flexRow,
          mt.gap(5),
          mt.overflow("hidden"),
          mt.p(4)
        ]}
        style={[
        ]}
      >
        {testMovies.map(({ title }) => (
          <Shadow {...mt.shadow.md}>
            <MoviePreview title={title} key={title} />
          </Shadow>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieScroll;
