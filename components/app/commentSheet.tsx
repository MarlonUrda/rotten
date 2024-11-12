import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { TextInput, View } from "react-native";
import CommentList from "./gameComments";
import mt from "@/styles/mtWind";
import { CommentInput } from "./commentInput";
import { Button } from "../ui/button";
import { X } from "lucide-react-native";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { CommentController } from "@/api/controllers/CommentsController";
import { useEffect } from "react";

interface Payload {
  gameId: number
}

interface CommentProps {
  payload: Payload
}

export function CommentSheet({ payload }: CommentProps) {

  const { gameId } = payload

  const getCommentQuery = useQuery({
    queryKey: ["comments", gameId],
    queryFn: () => CommentController.getComments(gameId),

  })

  useEffect(() => {
    console.log(getCommentQuery.data)
  }, [getCommentQuery])
  

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
        <CommentList comments={getCommentQuery.data ?? []}/>
      </View>
      <View style={[mt.position("absolute"), mt.bottom(0), mt.left(0), mt.right(0), mt.w("full"), mt.items("center"), mt.backgroundColor("green"), mt.pt(4), mt.pb(4)]}>
        <CommentInput gameId={gameId}/>
      </View>
    </ActionSheet>
  )
}