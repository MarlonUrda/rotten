import mt, { generic } from "@/styles/mtWind";
import { View } from "react-native";
import ResetScreen from "@/components/app/resetScreen";

export default function SendResetPage() {
  
  return (
    <View style={[mt.flex1]}>
      <View
        style={[
          mt.flex1,
          mt.items("flex-start"),
          mt.justify("flex-start"),
          mt.mt(16),
          mt.px(4),
          mt.overflow("visible"),
        ]}
      >
        <ResetScreen />
      </View>
    </View>
  );
}