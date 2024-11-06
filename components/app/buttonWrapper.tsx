import { View } from "react-native";
import { Button } from "../ui/button";
import { MovieRating } from "./movieRating";
import { Text } from "../ui/text";
import mt from "@/styles/mtWind";

export function ButtonWrapper() {
  return (
    <View style={[mt.flexRow, mt.justify("space-between"), mt.p(4), mt.items("center")]}>
      <View style={[mt.flexCol, mt.gap(2), mt.border(2), mt.p(4)]}>
        <Text style={[mt.align("center")]}>
          Que tal te parecio?
        </Text>
        <MovieRating rating={0} onChange={(rating) => console.log(Math.round(rating))}/>
        <Button variant="secondary">
          <Text style={[mt.align("center"), mt.w("full")]}>
            Puntuar
          </Text>
        </Button>
      </View>
      <Button>
        <Text style={[mt.align("center"), mt.w("full")]}>
          Añadir a lista
        </Text>
      </Button>
    </View>
  )
}