import { TextInput as Input } from "react-native";
import { Controller } from "react-hook-form";
import type { Control, FieldError } from "react-hook-form";
import Animated, { LinearTransition } from "react-native-reanimated";
import { FormError } from "./FormError";
import { FormLabel } from "./FormLabel";
import { StyleProp } from "react-native";
import { ViewStyle } from "@expo/html-elements/build/primitives/View";
import { TextInput } from "react-native-gesture-handler";
import { cssInterop } from "nativewind";
import React, { Ref, useState } from "react";
import { formStyles } from "@/styles/formStyleSheet";

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
    <Animated.View layout={LinearTransition} style={formStyles.inputContainer}>
      {label && <FormLabel label={label}/>}
      <Controller 
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value }}) => (
          <Animated.View>
            <Input
              style={[
                formStyles.input,
                focus && formStyles.inputFocus
              ]} 
              placeholder={placeholder}
              placeholderTextColor={"#fff"}
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
        )}
      />
      <FormError error={error} />
    </Animated.View>
  );
}