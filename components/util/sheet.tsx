import { registerSheet } from "react-native-actions-sheet";
import { ReviewSheet, ReviewInputSheet } from "../app/reviews/reviewSheet";
import { ReviewOptionSheet } from "../app/reviews/reviewContainer";

registerSheet("commentSheet", ReviewSheet);
registerSheet("reviewInputSheet", ReviewInputSheet);
registerSheet("reviewOptionSheet", ReviewOptionSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    commentSheet: typeof ReviewSheet;
    reviewInputSheet: typeof ReviewInputSheet;
    reviewOptionSheet: typeof ReviewOptionSheet;
  }
}
