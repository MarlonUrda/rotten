import { registerSheet } from "react-native-actions-sheet";
import { ReviewSheet } from "../app/reviews/reviewSheet";

registerSheet("commentSheet", ReviewSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    commentSheet: typeof ReviewSheet;
  }
}
