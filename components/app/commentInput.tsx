import { TextInput as Input } from "react-native";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Icon } from "react-native-elements";
import { SendHorizontal } from "lucide-react-native"
import mt from "@/styles/mtWind";
import { formStyles } from "@/styles/formStyleSheet";
import { SimpleInput } from "../forms/formsUtils/SimpleInput";
import { CommentController } from "@/api/controllers/CommentsController";
import { useState } from "react";
import { userAtom } from "@/utils/atoms/userAtom";
import { useAtom } from "jotai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCommentRequest } from "@/types/api/Comments";
import myToast from "../toast";
import { GameRating } from "./gameRating";

interface CommentInputProps {
  gameId: number;
}

export function CommentInput({ gameId }: CommentInputProps) {

  const commentQuery = useQueryClient()

  const [currentUser] = useAtom(userAtom)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)

  const onChange = (value: string) => {
    setComment(value)
  }

  const sendMutate = useMutation({
    mutationFn: (payload: CreateCommentRequest) => CommentController.createComment(payload, gameId),
    onSuccess: () => {
      myToast({ type: "success", message: "Comment added!" })
      setComment("")

      commentQuery.invalidateQueries({ queryKey: ["comments"] })
    },
    onError: (error) => {
      myToast({ type:"info", message:error.message})
    }
  })

  const submitComment = () => {
    if (!currentUser) {
      return;
    }
    if (comment.trim() === "") {
      return
    }
    console.log(rating)
    const payload = {
      content: comment,
      rating: rating,
      gameId,
      userId: currentUser._id
    }
    sendMutate.mutate(payload)
  }

  return (
    <View style={[mt.flexCol, mt.gap(4)]}>
      <View style={[mt.flexRow, mt.gap(8), mt.items("center")]}>
        <SimpleInput placeholder="Agrega tu reseña..." inputStyle={[mt.w(60)]} multiline onChangeText={onChange}/>
        <Button variant="primary" onPress={submitComment}>
          <SendHorizontal size={24} color="#000" />
        </Button>
      </View>
      <GameRating rating={0} onChange={(rating) => setRating(Math.round(rating))}/>
    </View>
  )
}