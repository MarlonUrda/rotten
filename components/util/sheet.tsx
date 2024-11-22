import { registerSheet } from "react-native-actions-sheet";
import { ReviewSheet, ReviewInputSheet } from "../app/reviews/reviewSheet";
import UpdateUser from "../app/updateUser";
import { SearchFilterSheet } from "../app/searchFilterSheet";
import { SheetDefinition } from "react-native-actions-sheet";
import { SearchGameQuery } from "@/types/api/games/getGameRequest";

registerSheet("commentSheet", ReviewSheet);
registerSheet("reviewInputSheet", ReviewInputSheet);
registerSheet("updateUser", UpdateUser)
registerSheet("searchFilterSheet", SearchFilterSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    commentSheet: typeof ReviewSheet;
    reviewInputSheet: typeof ReviewInputSheet;
    updateUser: typeof UpdateUser;
    searchFilterSheet: SheetDefinition<{
      payload: Omit<SearchGameQuery, "query">;
      returnValue: {
        filters: Omit<SearchGameQuery, "query">;
        clear: boolean;
      } | undefined;
    }>;
  }
}
