import { View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import mt from "@/styles/mtWind";
import { Text } from "@/components/ui/text";

export const Logo = () => (
  <View style={[mt.rotate(-3)]}>
    <Shadow {...mt.shadow.mdNoRound}>
      <View style={[mt.border(4), mt.p(2), mt.backgroundColor("white")]}>
        <Text
          size="2xl"
          weight="black"
          style={[mt.align("center"), mt.fontWeight("black")]}
        >
          ROTTEN 
            <Text
              size="2xl"
              weight="black"
              style={[mt.fontWeight("black"), mt.color("red")]}
              >
              
            
              MINDS
            </Text>
         
        </Text>
      </View>
    </Shadow>
  </View>
);