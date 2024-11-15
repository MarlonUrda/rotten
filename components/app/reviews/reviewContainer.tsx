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

export function ReviewContainer({ review }: CommentProps) {
  const [user] = useAtom(userAtom);
  return (
    <Animated.View
      style={[
        mt.w("full"),
        mt.flexCol,
        mt.gap(4),
        mt.p(4),
        mt.backgroundColor("background"),
        mt.rounded("base"),
      ]}
      layout={LinearTransition}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <View style={[mt.flexRow, mt.justify("space-between"), mt.p(4)]}>
        <View style={[mt.flexCol, mt.gap(2)]}>
          <Text size="md" weight="bold">
            {review.user.firstName} {review.user.lastName}
          </Text>
          <View style={[mt.flexRow]}>
            <GameRatingDisplay rating={review.rating ?? 2} size={24} />
          </View>
          <Text size="sm">{review.createdAt.toString()}</Text>
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
      <View style={[mt.pl(4), mt.pr(2)]}>
        <Text size="md" weight="normal">
          {review.content}
        </Text>
      </View>
    </Animated.View>
  );
}
