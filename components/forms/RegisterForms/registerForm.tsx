import { useState } from "react";
import { EmailForm } from "./infoForm";
import { PasswordForm } from "./passwordForm";
import Animated from "react-native-reanimated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FullSchema, fullSchema } from "./registerSchemas";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

type TabNumber = 0 | 1 | 2

export default function RegisterForm() {

  const fontLoaded = useFonts({
    "Poppins": require("../../../assets/fonts/Poppins-Regular.ttf"),
  })

  if(!fontLoaded) {
    console.log("No font loaded");
  }

  const form = useForm<FullSchema>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      info: {
        email: ""
      },
      password: {
        password: "",
        confirmPassword: ""
      }
    }
  })

  const [tab, setTab] = useState<TabNumber>(0)
  const tabs = [
    <EmailForm setTab={setTab} fullForm={form}/>,
    <PasswordForm setTab={setTab} fullForm={form}/>,
  ]

  return (
    <Animated.View style={style.container}>
      {
        tabs[tab] ?? <EmailForm setTab={setTab} fullForm={form}/>
      }
    </Animated.View>
  )
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8
  }
})