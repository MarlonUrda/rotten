import GamesScroll from "@/components/app/gamesScroll";
import mt from "@/styles/mtWind";
import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { GamesController } from "@/api/controllers/GamesController";
import { useEffect } from "react";
import { Navbar } from "@/components/app/navbar";

export default function Index() {
  const popularGamesQuery = useQuery({
    queryKey: ["games", "popular"],
    queryFn: GamesController.getPopularGames,
  })

  useEffect(() => {
   console.log(popularGamesQuery.data)
  }, [popularGamesQuery.data])


  return (
    <View style={[mt.pt(12), mt.p(2)]}>
      <Navbar />
      <GamesScroll title="Popular Games"
        gamesQuery={popularGamesQuery}
      />
    </View>
  );
}
