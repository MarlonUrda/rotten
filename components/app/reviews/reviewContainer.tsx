import { TouchableOpacity, View, Modal } from "react-native";
import Animated, {
  LinearTransition,
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { Text } from "../../ui/text";
import mt from "@/styles/mtWind";
import { userAtom } from "@/utils/atoms/userAtom";
import { useAtom } from "jotai";
import { GameRatingDisplay } from "../gameRating";
import { Review } from "@/types/Review";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMemo, useState } from "react";
import { SheetManager } from "react-native-actions-sheet";
import { OptionsDropdown } from "@/components/ui/optionsDropdown";
import { Shadow } from "react-native-shadow-2";
import { Button } from "@/components/ui/button";
import { useDeleteReview } from "@/hooks/app/useReview";

interface CommentProps {
  review: Review;
  canEdit?: boolean;
}

export function ReviewContainer({ review }: CommentProps) {
  const [user] = useAtom(userAtom);
  const containerColor = "white";
  const [moreOpen, setMoreOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const deleteReview = useDeleteReview(review._id, review.gameId);

  const reviewContent = useMemo(() => {
    if (moreOpen) {
      return review.content;
    } else {
      if (review.content.length > 50) {
        return review.content.slice(0, 50) + "...";
      } else {
        return review.content;
      }
    }
  }, [review.content, moreOpen]);

  const dropdownOptions = [
    {
      text: "Edit",
      onPress: () => {
        SheetManager.show("reviewInputSheet", {
          payload: {
            gameId: review.gameId,
            reviewId: review._id,
            oldContent: review.content,
            oldRating: review.rating,
          },
        });
      },
      iconName: "pencil",
    },
    {
      text: "Delete",
      onPress: () => {
        setModalVisible(true);
      },
      iconName: "trash-can",
    },
  ];

  return (
    <Animated.View layout={LinearTransition}>
      <Animated.View
        style={[
          mt.w("full"),
          mt.flexCol,
          mt.gap(4),
          mt.p(4),
          mt.backgroundColor(containerColor, 400),
          mt.border(2),
        ]}
        entering={ZoomIn}
        exiting={ZoomOut}
      >
        <TouchableOpacity style={[mt.flexRow, mt.justify("space-between")]}>
          <View style={[mt.flexCol, mt.gap(2)]}>
            <Text size="md" weight="bold">
              {review.user.firstName} {review.user.lastName}
            </Text>
            <View style={[mt.flexRow]}>
              <GameRatingDisplay rating={review.rating} size={24} />
            </View>
            <Text size="sm">{review.createdAt.toLocaleDateString()}</Text>
          </View>

          {user && user._id === review.userId ? (
            <OptionsDropdown options={dropdownOptions}>
              <MaterialCommunityIcons name="dots-vertical" size={24} />
            </OptionsDropdown>
          ) : (
            <View></View>
          )}
        </TouchableOpacity>

        <View>
          <Text size="md" weight="normal">
            {reviewContent}
          </Text>
          {review.content.length > 50 && (
            <TouchableOpacity onPress={() => setMoreOpen(!moreOpen)}>
              <Text size="sm">{moreOpen ? "\nShow less" : "\nShow more"}</Text>
            </TouchableOpacity>
          )}
        </View>

        <AlertModal
          visible={modalVisible}
          setVisible={setModalVisible}
          text="Are you sure you want to delete this review?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={() => {
            deleteReview.mutate();
          }}
          onCancel={() => {
            console.log("cancel");
          }}
        />
      </Animated.View>
    </Animated.View>
  );
}

interface AlertModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  text: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText: string;
  cancelText: string;
}

function AlertModal({
  visible,
  setVisible,
  text = "Are you sure?",
  onConfirm,
  confirmText = "Delete",
  onCancel,
  cancelText = "Cancel",
}: AlertModalProps) {
  return (
    <Modal visible={visible} animationType="fade" style={[]} transparent>
      <View style={[mt.flex1, mt.items("center"), mt.justify("center")]}>
        <Shadow {...mt.shadow.mdNoRound}>
          <View
            style={[
              mt.w(64),
              mt.backgroundColor("white"),
              mt.flexCol,
              mt.gap(2),
              mt.p(4),
              mt.border(4),
            ]}
          >
            {/* cancel button top right */}
            <View style={[mt.w("full"), mt.items("flex-end")]}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} />
              </TouchableOpacity>
            </View>
            <View style={[mt.flexCol, mt.gap(4)]}>
              <Text style={[mt.fontWeight("bold")]}>{text}</Text>
              <View style={[mt.flexRow, mt.justify("flex-start"), mt.gap(4)]}>
                <Button
                  variant="error"
                  onPress={() => {
                    setVisible(false);
                    onConfirm && onConfirm();
                  }}
                >
                  <Text>{confirmText}</Text>
                </Button>
                <Button
                  variant="primary"
                  onPress={() => {
                    setVisible(false);
                    onCancel && onCancel();
                  }}
                >
                  <Text>{cancelText}</Text>
                </Button>
              </View>
            </View>
          </View>
        </Shadow>
      </View>
    </Modal>
  );
}
