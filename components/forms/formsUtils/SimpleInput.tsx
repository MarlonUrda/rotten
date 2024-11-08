import { StyleProp, TextInput as Input, TextStyle, ViewStyle } from "react-native";
import Animated, {
  LinearTransition,
  useSharedValue,
  AnimatedStyle,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";
import { formStyles } from "@/styles/formStyleSheet";
import mt from "@/styles/mtWind";
import { useState } from "react";
import s from "@/styles/styleValues";
import { View } from "react-native";

interface SimpleInputProps {
  placeholder?: string;
  multiline?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

export function SimpleInput({
  placeholder,
  multiline,
  inputStyle,
  viewStyle,
}: SimpleInputProps) {
  const [focus, setFocus] = useState(false);
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(focus ? 5 : 0, { duration: s.timing.fast }),
        },
        {
          translateY: withTiming(focus ? 4 : 0, { duration: s.timing.fast }),
        },
      ],
    };
  }, [focus]);

  return(
    <Shadow {...s.shadow.md}>
      <View>
        <Animated.View style={[translateStyle]}>
          <Input
            style={[
              formStyles.input,
                    mt.backgroundColor("gray"),
                    mt.h(10),
                    mt.p(2),
                    mt.border(2),
                    mt.rounded("base"),
                    mt.color("black"),
                    inputStyle,
                    focus && mt.backgroundColor("purple", 200),
            ]}
            placeholder={placeholder}
            placeholderTextColor={"#000"}
            multiline={multiline}
            selectionColor={"#000"}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
          >
          </Input>
        </Animated.View>
      </View>
    </Shadow>
  )
}