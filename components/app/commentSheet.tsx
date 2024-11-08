import ActionSheet from "react-native-actions-sheet";
import { TextInput, View } from "react-native";
import CommentList from "./gameComments";
import mt from "@/styles/mtWind";

export function CommentSheet() {
  return(
    <ActionSheet id="commentSheet">
      <View style={[mt.pr(4), mt.pl(4), mt.pt(4)]}>
        <CommentList />
      </View>
      <TextInput style={[mt.border(2), mt.position("absolute"), mt.bottom(0), mt.w("full"), mt.h(14), mt.p(4)]}></TextInput>
    </ActionSheet>
  )
}