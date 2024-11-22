import { View, SafeAreaView } from "react-native";
import { Text } from "@/components/ui/text";
import LoginForm from "@/components/forms/loginForm";
import { generic } from "@/styles/mtWind";
import { useFonts } from "expo-font";
import s from "@/styles/styleValues";
import mt from "@/styles/mtWind";
import { Redirect } from "expo-router";
import { Shadow } from "react-native-shadow-2";
import LoginView from "@/components/app/loginView";


export default function Screen() {

  return (
    // <SafeAreaView style={[generic.safeArea, mt.pl(2), mt.pr(2)]}>
    //   <View style={[generic.headerContainer]}>
    //     <Text style={[generic.h1, {
    //       fontFamily: s.fontFamily.sans,
    //       fontWeight: "900"
    //     }]}>
    //       Rotten Minds 
    //     </Text>
    //     <Text style={[generic.h3, {
    //       fontFamily: s.fontFamily.sans,
    //     }]}>
    //       Sign Up
    //     </Text>
    //   </View>
    //   <Shadow {...mt.shadow.md}>
    //     <View style={[generic.formwrapper, mt.border(4), mt.p(2), mt.h("half"), mt.w(96)]}>
    //       <LoginForm />
    //     </View>
    //   </Shadow>
    // </SafeAreaView>
    <View style={[mt.flex1]}>
      <View style={[mt.flex1, mt.items("center"), mt.justify("center")]}>
        <LoginView />
      </View>
    </View>
  )
}
