import {
  Pressable,
  PressableProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import s from "@/styles/styleValues";
import Animated, {
  useAnimatedStyle,
  withTiming,
  
} from "react-native-reanimated";
import React from "react";
import { ActivityIndicator } from "react-native";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps extends PressableProps {
  variant?: "primary" | "secondary" | "error" | "success";
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  children: React.ReactNode
}

export function Button({ ...props }: ButtonProps) {
  const [pressed, setPressed] = React.useState(false);
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(pressed ? 5 : 0, { duration: s.timing.fast }),
        },
        {
          translateY: withTiming(pressed ? 4 : 0, { duration: s.timing.fast }),
        },
      ],
    };
  }, [pressed]);

  return (
    <Shadow {...s.shadow.md}>
      <View>

      
      <Animated.View style={[translateStyle]}>
        <AnimatedPressable
          style={[buttonStyles(props.variant).button, props.style, props.disabled ? { opacity: 0.5 } : {}]}
          {...props}
          onPressIn={(e) => {
            setPressed(true);
            props.onPressIn?.(e);
          }}
          onPressOut={(e) => {
            setPressed(false);
            props.onPressOut?.(e);
          }}
        >
            {props.loading ? (
            <ActivityIndicator color={s.colors.white} />
            ) : props.children}
        </AnimatedPressable>
      </Animated.View>
      </View>
    </Shadow>
  );
}

const buttonStyles = (variant: ButtonProps["variant"]) => {
  let backgroundColor: string = s.colors.blue[500];
  let textColor: string = s.colors.white;

  switch (variant) {
    case "secondary":
      backgroundColor = s.colors.orange[500];
      textColor = s.colors.black;
      break;
    case "error":
      backgroundColor = s.colors.red[500];

      break;
    case "success":
      backgroundColor = s.colors.green[500];
      textColor = s.colors.black;
      break;
  }

  return StyleSheet.create({
    button: {
      paddingVertical: s.pixels[2],
      borderRadius: s.borderRadius.base,
      borderWidth: s.borderWidth[2],
      borderColor: s.colors.black,
      color: textColor,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: s.pixels[4],
      backgroundColor: backgroundColor,
    },
  });
};
