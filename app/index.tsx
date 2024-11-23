import { View, SafeAreaView } from "react-native";
import { Text } from "@/components/ui/text";
import LoginForm from "@/components/forms/loginForm";
import { generic } from "@/styles/mtWind";
import { useFonts } from "expo-font";
import s from "@/styles/styleValues";
import mt from "@/styles/mtWind";
import { Redirect } from "expo-router";
import { Shadow } from "react-native-shadow-2";
import LoginView from "@/components/app/loginView";
import { useQuery } from "@tanstack/react-query";
import { GamesController } from "@/api/controllers/GamesController";
import Bg from "@/components/app/Bg";


export default function Screen() {
    const popularGamesQuery = useQuery({
      queryKey: ["games", "popular"],
      queryFn: () => {
        return GamesController.getPublicCollection("popular");
      }
    });
    const newGamesQuery = useQuery({
      queryKey: ["games", "new"],
      queryFn: () => {
        return GamesController.getPublicCollection("new");
      }
    });
    const highestRatedGamesQuery = useQuery({
      queryKey: ["games", "highest-rated"],
      queryFn: () => {
        return GamesController.getPublicCollection("highest-rated");
      }
    });

  return (
    <View style={[mt.flex1]}>
      <View style={[mt.flex1, mt.items("flex-start"), mt.justify("flex-start"), mt.px(4), mt.mt(16)]}>
        <LoginView />
      </View>
      <Bg></Bg>
    </View>
  )
}
