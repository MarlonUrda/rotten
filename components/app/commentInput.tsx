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
import { useMutation } from "@tanstack/react-query";
import { CreateCommentRequest } from "@/types/api/Comments";
import myToast from "../toast";

interface CommentInputProps {
  gameId: number;
}

export function CommentInput({ gameId }: CommentInputProps) {

  const [currentUser] = useAtom(userAtom)
  const [comment, setComment] = useState("")

  const onChange = (value: string) => {
    setComment(value)
  }

  const sendMutate = useMutation({
    mutationKey: ["comments", gameId],
    mutationFn: (payload: CreateCommentRequest) => CommentController.createComment(payload, gameId),
    onSuccess: () => {
      myToast(true, "Comentario agregado!")
      setComment("")
    },
    onError: (error) => {
      myToast(false, error.message)
    }
  })

  const submitComment = () => {
    console.log(comment)
    if (comment.trim() === "") {
      return
    }
    if (!currentUser) {
      return;
    }
    const payload = {
      content: comment,
      rating: 3,
      gameId,
      userId: currentUser._id
    }
    sendMutate.mutate(payload)
  }

  return (
    <View style={[mt.flexRow, mt.gap(8), mt.items("center")]}>
      <SimpleInput placeholder="Agrega tu reseña..." inputStyle={[mt.w(60)]} multiline onChangeText={onChange}/>
      <Button variant="primary" onPress={submitComment}>
        <SendHorizontal size={24} color="#000" />
      </Button>
    </View>
  )
}