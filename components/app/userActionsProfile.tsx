import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import mt from "@/styles/mtWind";
import { LogOut, Trash, UserPen, ListVideo } from "lucide-react-native";
import { router } from "expo-router";

interface UserActionProps {
  onDelete: () => void;
  onLogOut: () => void
  onUpdate: () => void;
}

export function UserActions({ onDelete, onLogOut, onUpdate }: UserActionProps){
  return (
    <View style={[mt.flexCol, mt.items("center"), mt.justify("center"), mt.gap(4),]}>
      <Button variant="primary" onPress={onUpdate}>
        <View style={[mt.flexRow, mt.gap(4)]}>
          <UserPen color={"#000"}/>
          <Text>Actualizar perfil</Text>
        </View>
      </Button>
      <Button variant="secondary" onPress={() => router.push("/playlist")}>
      <View style={[mt.flexRow, mt.gap(4)]}>
          <ListVideo color={"#000"}/>
          <Text>Mi lista</Text>
        </View>
      </Button>
      <Button variant="secondary" onPress={onLogOut}>
      <View style={[mt.flexRow, mt.gap(4)]}>
        <LogOut color={"#000"}/>
        <Text>Cerrar sesión</Text>
      </View>
      </Button>
      <Button variant="error" onPress={onDelete}>
      <View style={[mt.flexRow, mt.gap(4)]}>
        <Trash color={"#000"}/>
        <Text>Borrar cuenta</Text>
      </View>
      </Button>
    </View>
  )
}