import mt, { generic } from "@/styles/mtWind";
import { View, SafeAreaView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import SendResetForm from "@/components/forms/changePassword/sendResetForm";

export default function SendResetPage() {
  
  return (
    <SafeAreaView style={[mt.flex1, mt.justify("flex-start")]}>
      <View style={[mt.flexCol, mt.gap(4), mt.w("full"), mt.items("center"), mt.pt(20)]}>
        <View style={generic.headerContainer}>
          <Text weight="bold" style={generic.h1}>
            Rotten Minds
          </Text>
          <Text weight="normal" style={generic.h3}>
            Change Password
          </Text>
        </View>

        <View style={[mt.p(4), mt.rounded("lg"), mt.w("full")]}>
          <SendResetForm />
        </View>
      </View>
    </SafeAreaView>
  );
}