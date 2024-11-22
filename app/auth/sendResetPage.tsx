import mt, { generic } from "@/styles/mtWind";
import { View } from "react-native";
import ResetScreen from "@/components/app/resetScreen";

export default function SendResetPage() {
  
  return (
    <View style={[mt.flex1]}>
      <View style={[mt.flex1, mt.items("center"), mt.justify("center")]}>
        <ResetScreen />
      </View>
    </View>
  );
}