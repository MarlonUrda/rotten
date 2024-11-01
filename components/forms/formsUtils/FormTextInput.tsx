import { TextInput as Input } from "react-native";
import { Controller } from "react-hook-form";
import type { Control, FieldError } from "react-hook-form";
import Animated, { LinearTransition, useSharedValue } from "react-native-reanimated";
import { FormError } from "./FormError";
import { FormLabel } from "./FormLabel";
import { StyleProp } from "react-native";
import { ViewStyle } from "@expo/html-elements/build/primitives/View";
import { TextInput } from "react-native-gesture-handler";
import React, { Ref, useState } from "react";
import { formStyles } from "@/styles/formStyleSheet";
import { Shadow } from "react-native-shadow-2"
import s from "@/styles/styleValues";
import mt from "@/styles/mtWind";

interface FormTextInputProps {
  placeholder?: string;
  label?: string;
  name: string;
  control: Control<any>;
  type?:"text" | "password";
  error?: FieldError;
  style?: StyleProp<ViewStyle>;
  inputRef?: Ref<TextInput>;
  autofocus?: boolean;
}

export function FormTextInput ({
  placeholder,
  label,
  name,
  control,
  type = "text",
  error,
}: FormTextInputProps) {

  const [focus, setFocus] = useState(false)

  return (
    <Animated.View layout={LinearTransition} style={[mt.flexCol, mt.gap(2)]}>
      {label && <FormLabel label={label}/>}
      <Controller 
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value }}) => (
          <Animated.View>
            <Shadow 
              {...s.shadow.md}
            >
              <Input
                style={[
                  formStyles.input, mt.backgroundColor("gray"),mt.h(10),mt.p(1), 
                  focus && mt.backgroundColor("purple", 200)
                ]} 

                selectionColor={"#000"}
                placeholder={placeholder}
                placeholderTextColor={"#000"}
                placeholderClassName=""
                onBlur={() => {
                  setFocus(false)
                  onBlur()
                }}
                onFocus={() => setFocus(true)}
                onChangeText={onChange}
                value={value}
                secureTextEntry={type === "password"}
                maxLength={100}
              >
              </Input>
            </Shadow>
          </Animated.View>
        )} 
      />
      <FormError error={error}/>
    </Animated.View>
  )
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
  const [focus, setFocus] = useState(false)
  return (
    <Animated.View layout={LinearTransition} className={"flex flex-col gap-4"}>
      {label && <FormLabel label={label} />}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Shadow stretch offset={[5, 4]} startColor="#000" endColor="#000" distance={2}>
            <Input
              style={[
                formStyles.input,
                focus && formStyles.inputFocus
              ]} 
              placeholder={placeholder}
              placeholderClassName="text-gray-200"
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                setFocus(false)
                onBlur()
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