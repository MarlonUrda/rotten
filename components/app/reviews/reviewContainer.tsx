import { TouchableOpacity, View } from "react-native";
import Animated, {
  LinearTransition,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { Text } from "../../ui/text";
import mt from "@/styles/mtWind";
import { Shadow } from "react-native-shadow-2";
import s from "@/styles/styleValues";
import { userAtom } from "@/utils/atoms/userAtom";
import { useAtom } from "jotai";
import { GameRatingDisplay } from "../gameRating";
import { Review } from "@/types/Review";

interface CommentProps {
  review: Review;
  canEdit?: boolean;
}

function getContainerColor(rating: number) {
  if (rating < 2) {
    return "red";
  } else if (rating < 3) {
    return "yellow";
  } else {
    return "green";
  }
}

export function ReviewContainer({ review }: CommentProps) {
  const [user] = useAtom(userAtom);
  const containerColor = getContainerColor(review.rating);

  return (
    <Animated.View
      style={[
        mt.w("full"),
        mt.flexCol,
        mt.gap(4),
        mt.p(4),
        mt.backgroundColor(containerColor, 400),
        mt.border(2),
      ]}
      layout={LinearTransition}
      entering={FadeIn}
      exiting={FadeOut}
    >
        <View style={[mt.flexRow, mt.justify("space-between")]}>
          <View style={[mt.flexCol, mt.gap(2)]}>
            <Text size="md" weight="bold">
              {review.user.firstName} {review.user.lastName}
            </Text>
            <View style={[mt.flexRow]}>
              <GameRatingDisplay rating={2} size={24} />
            </View>
            <Text size="sm">{review.createdAt.toLocaleDateString()}</Text>
          </View>

          {user && user._id === review.userId ? (
            <Shadow {...s.shadow.md}>
              <TouchableOpacity
                style={[
                  mt.w(6),
                  mt.h(6),
                  mt.backgroundColor("purple"),
                  mt.rounded("base"),
                ]}
              ></TouchableOpacity>
            </Shadow>
          ) : (
            <View></View>
          )}
        </View>

        <View>
          <Text size="md" weight="normal">
            {review.content}
          </Text>
        </View>
    </Animated.View>
  );
}
