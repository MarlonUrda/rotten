import { registerSheet } from "react-native-actions-sheet";
import { CommentSheet } from "../app/commentSheet";

registerSheet("commentSheet", CommentSheet);

declare module "react-native-actions-sheet" {
  interface Sheets{
    "commentSheet": typeof CommentSheet;
  }
}