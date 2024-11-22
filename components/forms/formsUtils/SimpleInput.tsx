import {
  StyleProp,
  TextInput as Input,
  TextStyle,
  ViewStyle,
  TextInputProps,
} from "react-native";
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
import React, { useState } from "react";
import s from "@/styles/styleValues";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

interface SimpleInputProps extends TextInputProps {
  placeholder?: string;
  multiline?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  inputRef?: React.RefObject<Input>;
}

export function SimpleInput({
  placeholder,
  multiline,
  inputStyle,
  viewStyle,
  inputRef,
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

  return (
    <Shadow {...s.shadow.md}>
      <View
      >
        <Animated.View style={[translateStyle]}>
          <Input
            style={[
              formStyles.input,
              mt.backgroundColor("gray", 300),

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
            onBlur={(e) => {
              if (props.onBlur) {
                props.onBlur(e);
              }
              setFocus(false);
            }}
            onFocus={(e) => {
              if (props.onFocus) {
                props.onFocus(e);
              }
              setFocus(true);
            }}
            onChangeText={onChangeText}
            {...props}
            ref={inputRef}
          ></Input>
        </Animated.View>
      </View>
    </Shadow>
  );
}

export function DummySimpleInput({
  inputStyle,
}: {
  inputStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <Shadow {...s.shadow.md}>
      <View
        style={[
          mt.backgroundColor("gray", 300),
          mt.h(10),
          mt.p(2),
          mt.border(2),
          mt.rounded("base"),
          mt.color("black"),
          inputStyle,
        ]}
      >
        <Text>Add your review...</Text>
      </View>
    </Shadow>
  );
}
