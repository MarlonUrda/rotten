import {
  Pressable,
  PressableProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
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
  variant?: "primary" | "secondary" | "error" | "success" | "white";
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  children: React.ReactNode;
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
            style={[
              buttonStyles(props.variant, props.disabled ?? false).button,
              props.style,
            ]}
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
            ) : (
              props.children
            )}
          </AnimatedPressable>
        </Animated.View>
      </View>
    </Shadow>
  );
}

interface PushButtonProps extends ButtonProps {
  isPushed: boolean;
}

/**
 *
 * Controlled push button
 */
export function CPushButton({ isPushed, ...props }: PushButtonProps) {
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(isPushed ? 5 : 0, { duration: s.timing.fast }),
        },
        {
          translateY: withTiming(isPushed ? 4 : 0, { duration: s.timing.fast }),
        },
      ],
    };
  }, [isPushed]);

  return (
    <Shadow {...s.shadow.md}>
      <View>
        <Animated.View style={[translateStyle]}>
          <AnimatedPressable
            style={[
              buttonStyles(props.variant).button,
              props.style,
            ]}
            {...props}
            onPressIn={(e) => {
              props.onPressIn?.(e);
            }}
            onPressOut={(e) => {
              props.onPressOut?.(e);
            }}
          >
            {props.loading ? (
              <ActivityIndicator color={s.colors.white} />
            ) : (
              props.children
            )}
          </AnimatedPressable>
        </Animated.View>
      </View>
    </Shadow>
  );
}

interface FlatButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "error" | "success";
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function FlatButton({ ...props }: FlatButtonProps) {
  return (
    <TouchableOpacity
      style={[
        buttonStyles(props.variant).flatButton,
        props.style,
      ]}
      {...props}
    >
      {props.children}
    </TouchableOpacity>
  )
}

const buttonStyles = (variant: ButtonProps["variant"], disabled: boolean = false) => {
  let backgroundColor: string = disabled ? s.colors.gray[500] : s.colors.blue[500];
  let textColor: string = s.colors.white;

  switch (variant) {
    case "secondary":
      backgroundColor = disabled ? s.colors.gray[500] : s.colors.orange[500];
      textColor = s.colors.black;
      break;
    case "error":
      backgroundColor = disabled ? s.colors.gray[500] : s.colors.red[500];
      textColor = s.colors.black;
      break;
    case "success":
      backgroundColor = s.colors.green[500];
      textColor = s.colors.black;
      break;
    case "white":
      backgroundColor = s.colors.white;
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
    flatButton: {
      // same but no borderRadius
      paddingVertical: s.pixels[2],
      borderWidth: s.borderWidth[2],
      borderColor: s.colors.black,
      borderRadius: s.borderRadius.none,
      color: textColor,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: s.pixels[2],
      backgroundColor: backgroundColor,
    }
  });
};
