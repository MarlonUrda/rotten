import { TextInput as Input } from "react-native";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Icon } from "react-native-elements";
import { SendHorizontal } from "lucide-react-native"
import mt from "@/styles/mtWind";
import { formStyles } from "@/styles/formStyleSheet";
import { SimpleInput } from "../forms/formsUtils/SimpleInput";
import { CommentController } from "@/api/controllers/CommentsController";

interface CommentInputProps {
  gameId: number;
}

export function CommentInput({ gameId }: CommentInputProps) {
  return (
    <View style={[mt.flexRow, mt.gap(8), mt.items("center")]}>
      <SimpleInput placeholder="Agrega tu reseña..." inputStyle={[mt.w(60)]} multiline/>
      <Button variant="primary">
        <SendHorizontal size={24} color="#000" />
      </Button>
    </View>
  )
}