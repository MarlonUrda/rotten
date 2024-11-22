import mt from "@/styles/mtWind";
import { Button } from "../ui/button";
import { View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

export function SimpleNavbar() {
  const router = useRouter();

  return (
    <View
      style={[mt.w("full"), mt.mt(10), mt.flexRow, mt.justify("space-between"), mt.px(4)]}
    >
      {/* go back button */}
      <Button onPress={() => router.back()} variant="error">
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </Button>
    </View>
  );
}
