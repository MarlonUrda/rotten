import { registerSheet } from "react-native-actions-sheet";
import { ReviewSheet, ReviewInputSheet } from "../app/reviews/reviewSheet";
import { ReviewOptionSheet } from "../app/reviews/reviewContainer";
import UpdateUser from "../app/updateUser";

registerSheet("commentSheet", ReviewSheet);
registerSheet("reviewInputSheet", ReviewInputSheet);
registerSheet("reviewOptionSheet", ReviewOptionSheet);
registerSheet("updateUser", UpdateUser)

declare module "react-native-actions-sheet" {
  interface Sheets {
    commentSheet: typeof ReviewSheet;
    reviewInputSheet: typeof ReviewInputSheet;
    reviewOptionSheet: typeof ReviewOptionSheet;
    updateUser: typeof UpdateUser;
  }
}
