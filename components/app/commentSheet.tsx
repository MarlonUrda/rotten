import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { TextInput, View, Dimensions } from "react-native";
import CommentList from "./gameComments";
import mt from "@/styles/mtWind";
import { CommentInput } from "./commentInput";
import { Button } from "../ui/button";
import { X } from "lucide-react-native";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { CommentController } from "@/api/controllers/CommentsController";
import { useEffect } from "react";
import { Text } from "../ui/text";
import { EmptyCommentsSplash } from "./emptyComentariesSplash";
import { Title } from "../ui/Title";

interface Payload {
  gameId: number
}

interface CommentProps {
  payload: Payload
}

export function CommentSheet({ payload }: CommentProps) {
  const {height} = Dimensions.get("window")
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

  return (
    <ActionSheet id="commentSheet">
      <View
        style={[
          mt.flexCol,
          mt.justify("flex-start"),
          mt.items("center"),
          mt.pxh(height - 100),
          mt.w("full"),
          mt.p(4),
        ]}
      >
        <View
          style={[
            mt.flexRow,
            mt.justify("space-between"),
            mt.items("center"),
            mt.p(4),
            mt.w("full"),
          ]}
        >
          <Title title="Comentarios" color="red" size="2xl" shadow />

          <Button onPress={closeSheet} variant="error">
            <X size={24} color="#000" />
          </Button>
        </View>
      <View style={[mt.flexCol, mt.flex1]}>
        {
        getCommentQuery.data &&
        getCommentQuery.data.length > 0 ? (
          <CommentList comments={getCommentQuery.data ?? []} />
        ) : (
          <EmptyCommentsSplash />
        )}
      </View>
      <View>
        <CommentInput gameId={gameId} />
      </View>
      </View>
      
    </ActionSheet>
  );
}