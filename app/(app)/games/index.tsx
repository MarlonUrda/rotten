import GamesScroll from "@/components/app/gamesScroll";
import mt from "@/styles/mtWind";
import { ScrollView, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { GamesController } from "@/api/controllers/GamesController";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/app/navbar";
import { GamePreview } from "@/types/api/games/gamePreview";

export default function Index() {
  const popularGamesQuery = useQuery({
    queryKey: ["games", "popular"],
    queryFn: GamesController.getPopularGames,
  })

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      
      <View style={[mt.pt(12), mt.p(2)]}>
        <Navbar />
        <GamesScroll title="Popular Games"
          gamesQuery={popularGamesQuery}
        />
        <GamesScroll title="MTCritics" gamesQuery={popularGamesQuery} order="critics"/>
        <GamesScroll title="Hot Games" gamesQuery={popularGamesQuery} order="date"/>
      </View>
    </ScrollView>
  );
}
