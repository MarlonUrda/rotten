import { TextInput as Input, View } from "react-native";
import { Controller } from "react-hook-form";
import type { Control, FieldError } from "react-hook-form";
import Animated, {
  LinearTransition,
  useSharedValue,
  AnimatedStyle,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { FormError } from "./FormError";
import { FormLabel } from "./FormLabel";
import { StyleProp } from "react-native";
import { TextStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { Ref, useState } from "react";
import { formStyles } from "@/styles/formStyleSheet";
import { Shadow } from "react-native-shadow-2";
import s from "@/styles/styleValues";
import mt from "@/styles/mtWind";
import { ViewStyle } from "react-native";

interface FormTextInputProps {
  placeholder?: string;
  label?: string;
  name: string;
  control: Control<any>;
  type?: "text" | "password";
  error?: FieldError;
  inputStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  inputRef?: Ref<TextInput>;
  autofocus?: boolean;
}

export function FormTextInput({
  placeholder,
  label,
  name,
  control,
  type = "text",
  error,
  inputStyle,
  viewStyle,
}: FormTextInputProps) {
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
    <Animated.View
      layout={LinearTransition}
      style={[mt.flexCol, mt.gap(2), viewStyle]}
    >
      {label && <FormLabel label={label} />}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Shadow {...s.shadow.md}>
            <View>
              <Animated.View
                style={[translateStyle]}
                
              >
                <Input
                  style={[
                    formStyles.input,
                    mt.backgroundColor("gray", 300),
                    mt.h(10),
                    mt.p(2),
                    mt.border(2),
                    mt.rounded("base"),
                    mt.color("black"),
                    inputStyle,
                    focus && mt.backgroundColor("purple", 200),
                    
                  ]}
                  selectionColor={"#000"}
                  placeholder={placeholder}
                  placeholderTextColor={"#000"}
                  placeholderClassName=""
                  onBlur={() => {
                    setFocus(false);
                    onBlur();
                  }}
                  onFocus={() => setFocus(true)}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={type === "password"}
                  maxLength={100}
                ></Input>
              </Animated.View>
            </View>
          </Shadow>
        )}
      />
      <FormError error={error} />
    </Animated.View>
  );
}

export function UnstyledFormTextInput({
  placeholder,
  label,
  name,
  control,
  type = "text",
  error,
  autofocus,
}: FormTextInputProps) {
  const [focus, setFocus] = useState(false);
  return (
    <Animated.View layout={LinearTransition} className={"flex flex-col gap-4"}>
      {label && <FormLabel label={label} />}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Shadow
            stretch
            offset={[5, 4]}
            startColor="#000"
            endColor="#000"
            distance={2}
          >
            <Input
              style={[formStyles.input, focus && formStyles.inputFocus]}
              placeholder={placeholder}
              placeholderClassName="text-gray-200"
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                setFocus(false);
                onBlur();
              }}
              onFocus={() => setFocus(true)}
              secureTextEntry={type === "password"}
              autoFocus={autofocus}
              maxLength={100}
            />
          </Shadow>
        )}
      />
      <FormError error={error} />
    </Animated.View>
  );
}
