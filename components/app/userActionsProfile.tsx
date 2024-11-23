import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import mt from "@/styles/mtWind";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
          <MaterialCommunityIcons name="account-edit" size={24} color="#000" />
          <Text>Edit Profile</Text>
        </View>
      </Button>
      <Button variant="secondary" onPress={() => router.push("/playlist")}>
      <View style={[mt.flexRow, mt.gap(4)]}>
        <MaterialCommunityIcons name="playlist-play" size={24} color="#000" />
        <Text>My Playlist</Text>
      </View>
      </Button>
      <Button variant="secondary" onPress={onLogOut}>
      <View style={[mt.flexRow, mt.gap(4)]}>
        <MaterialCommunityIcons name="logout" size={24} color="#000" />
        <Text>Log Out</Text>
      </View>
      </Button>
      <Button variant="error" onPress={onDelete}>
      <View style={[mt.flexRow, mt.gap(4)]}>
        <MaterialCommunityIcons name="account-remove" size={24} color="#000" />
        <Text>Delete Account</Text>
      </View>
      </Button>
    </View>
  )
}