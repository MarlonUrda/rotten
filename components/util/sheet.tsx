import { registerSheet } from "react-native-actions-sheet";
import { ReviewSheet, ReviewInputSheet } from "../app/reviews/reviewSheet";
import UpdateUser from "../app/updateUser";

registerSheet("commentSheet", ReviewSheet);
registerSheet("reviewInputSheet", ReviewInputSheet);
registerSheet("updateUser", UpdateUser)

declare module "react-native-actions-sheet" {
  interface Sheets {
    commentSheet: typeof ReviewSheet;
    reviewInputSheet: typeof ReviewInputSheet;
    updateUser: typeof UpdateUser;
  }
}
