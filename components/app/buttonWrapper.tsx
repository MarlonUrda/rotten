import { View } from "react-native";
import { Button } from "../ui/button";
import { GameRating } from "./gameRating";
import { Text } from "../ui/text";
import { ActionSheetRef, SheetManager } from "react-native-actions-sheet";
import mt from "@/styles/mtWind";

interface ButtonWrapperProps {
  gameId: number;
}

export function ButtonWrapper({ gameId}: ButtonWrapperProps) {



  return (
    <View style={[mt.flexRow, mt.justify("space-between"), mt.p(4), mt.items("center")]}>
      <View style={[mt.flexCol, mt.gap(2), mt.border(2), mt.p(4)]}>
        <Text style={[mt.align("center")]}>
          Que tal te parecio?
        </Text>
        <Button variant="secondary">
          <Text style={[mt.align("center"), mt.w("full")]}>
            Puntuar
          </Text>
        </Button>
      </View>
      <View style={[mt.flexCol, mt.gap(10), mt.justify("center")]}>
        <Button >
          <Text style={[mt.align("center")]}>
            Ver reseñas
          </Text>
        </Button>
        <Button>
          <Text style={[mt.align("center"), mt.w("full")]}>
            Añadir a lista
          </Text>
        </Button>
      </View>
    </View>
  )
}