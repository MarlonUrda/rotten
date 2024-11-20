import mt from "@/styles/mtWind";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, { BounceIn, BounceOut, SlideInDown, SlideOutUp, ZoomIn, ZoomOut } from "react-native-reanimated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Shadow } from "react-native-shadow-2";
import { Pressable } from "react-native";

interface Option {
  text: string;
  onPress: () => void;
  iconName: string;
}

interface OptionDropdownProps {
  options: Option[];
  children: React.ReactNode;
}

export const OptionsDropdown: React.FC<OptionDropdownProps> = ({
  options,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  return (
    <View
      style={[
        mt.position("relative"),
        mt.flexCol,
        mt.items("flex-end"),
        mt.z(9999999),
      ]}
    >
      <TouchableOpacity onPress={toggleDropdown}>{children}</TouchableOpacity>
      {visible && (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          style={[mt.position("absolute"), mt.top(6), mt.z(9999999)]}
        >
          <Shadow {...mt.shadow.mdNoRound}>
            <Animated.View
              style={[mt.backgroundColor("white"), mt.border(2), mt.w(32)]}
            >
              {options.map((option, index) => (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      option.onPress();
                      setVisible(false);
                    }}
                    style={[
                      mt.flexRow,
                      mt.items("center"),
                      mt.px(2),
                      mt.p(1),
                      mt.gap(2),
                      mt.backgroundColor("white"),
                    ]}
                  >
                    {/* @ts-ignore */}
                    <MaterialCommunityIcons name={option.iconName} size={24} />
                    <Text>{option.text}</Text>
                  </TouchableOpacity>
                  {/* if not last index, add a separator */}
                  {index < options.length - 1 && (
                    <View style={[mt.borderTop(2)]}></View>
                  )}
                </View>
              ))}
            </Animated.View>
          </Shadow>
        </Animated.View>
      )}
    </View>
  );
};
