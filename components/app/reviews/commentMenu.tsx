import mt from "@/styles/mtWind";
import { View } from "react-native";
import { HoldItem } from "react-native-hold-menu";

const MenuItems = [
  { text: "Acciones", isTitle: true, onPress: () => {} },
  { text: "Editar comentario", icon: "edit", onPress: () => {console.log("Editar este comentario") } },
  { text: "Borrar comentario", icon: "trash", isDestructive: true, onPress: () => {console.log("Eliminar comentario")} }
]

export function ReviewMenu(){
  return (
    <View>
      <HoldItem items={MenuItems}>
        <View style={[mt.w("full"), mt.h(20)]}/>
      </HoldItem>
      <HoldItem items={MenuItems}>
        <View style={[mt.w("full"), mt.h(20)]}/>
      </HoldItem>
      <HoldItem items={MenuItems} menuAnchorPosition="bottom-right">
        <View style={[mt.w("full"), mt.h(20)]}/>
      </HoldItem>
    </View>
  )
}