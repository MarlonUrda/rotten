import { StyleProp, TextInput as Input, TextStyle, ViewStyle, TextInputProps } from "react-native";
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

interface SimpleInputProps extends TextInputProps {
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
  onChangeText,
  ...props
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
            onChangeText={onChangeText}
            {...props}
          >
          </Input>
        </Animated.View>
      </View>
    </Shadow>
  )
}