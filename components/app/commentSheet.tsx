import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { TextInput, View } from "react-native";
import CommentList from "./gameComments";
import mt from "@/styles/mtWind";
import { CommentInput } from "./commentInput";
import { Button } from "../ui/button";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "../ui/text";

export function CommentSheet() {

  const closeSheet = () => {
    console.log("jola");
    SheetManager.hide("commentSheet")
  }

  return(
    <ActionSheet id="commentSheet">
      <View style={[mt.pr(4), mt.pl(4), mt.pt(4)]}>
        <View style={[mt.w(10), mt.h(10), mt.position("absolute"), mt.top(5), mt.right(5), mt.z(1)]}>
          <Button onPress={closeSheet} variant="error">
            <X size={24} color="#000"/>
          </Button>
        </View>
        <CommentList />
      </View>
      <View style={[mt.position("absolute"), mt.bottom(0), mt.left(0), mt.right(0), mt.w("full"), mt.items("center"), mt.backgroundColor("green"), mt.pt(4), mt.pb(4)]}>
        <CommentInput />
      </View>
    </ActionSheet>
  )
}