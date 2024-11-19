import ActionSheet from "react-native-actions-sheet";
import { Button } from "./button";
import { View } from "react-native";
import s from "@/styles/styleValues";
import mt from "@/styles/mtWind";
import { Text } from "./text";

interface Option {
  text: string;
  onPress: () => void;
}

interface OptionSheetProps {
  options: Option[];
  onClose: () => void;
  close: () => void;
}

export function OptionSheet({ options, onClose, close }: OptionSheetProps) {
  return (
    <ActionSheet
      onClose={onClose}
      containerStyle={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTopWidth: s.borderWidth[4],
      }}
    >
      <View
        style={[
          mt.flexCol,
          mt.justify("flex-start"),
          mt.items("center"),
          mt.w("full"),
          mt.p(4),
          mt.gap(4),
        ]}
      >
        {options.map((option, index) => (
          <Button
            key={index}
            onPress={() => {
              option.onPress();
              // close on timeout to allow for animations
              
            }}
          >
            <Text>{option.text}</Text>
          </Button>
        ))}
      </View>
    </ActionSheet>
  );
}
