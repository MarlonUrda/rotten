import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "../formsUtils/FormTextInput"; 
import Animated, {
  LinearTransition,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { InfoSchema, infoSchema, FullSchema } from "./registerSchemas";
import { useMutation } from "@tanstack/react-query";
import AuthController from "@/api/controllers/AuthController";
import myToast from "@/components/toast";
import { Link } from "expo-router";
import { formStyles, mtForm } from "@/styles/formStyleSheet";
import {  View } from "react-native";
import { useFonts } from "expo-font";
import mt from "@/styles/mtWind";

interface InfoFormProps {
  setTab: (tab: 0 | 1) => void;
  fullForm: UseFormReturn<FullSchema>;
}

export function EmailForm({ setTab, fullForm }: InfoFormProps) {

  const fontLoaded = useFonts({
    "Poppins": require("../../../assets/fonts/Poppins-Regular.ttf"),
  })

  if(!fontLoaded) {
    console.log("No font loaded");
  }

  const form = useForm<InfoSchema>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      email: fullForm.getValues("info").email,
      firstName: fullForm.getValues("info").firstName,
      lastName: fullForm.getValues("info").lastName,
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: AuthController.verifyEmailAvailability,
    onError: (_) => {
      myToast({type: "error", message: "Error verifying your email"});
    },
    onSuccess: (data) => {
      if (!data.available) {
        // set an error in form
        form.setError("email", {
          type: "manual",
          message: "Someone is using this email.",
        });
        return;
      }
      fullForm.setValue("info", {
        email: form.getValues("email"),
        firstName: form.getValues("firstName"),
        lastName: form.getValues("lastName"),
      });
      setTab(1);
    },
  });

  const onSubmit = (data: InfoSchema) => {
    verifyEmailMutation.mutate(data);
  }

  return (
    <Animated.View style={mtForm.container}
      layout={LinearTransition}
      entering={SlideInRight}
      exiting={SlideOutLeft}
    >
      <FormTextInput 
        name="email"
        control={form.control}
        label="Email"
        placeholder="rottenminds@gmail.com"
        error={form.formState.errors.email}
      />
      {/* two flex row fields */}

      <Animated.View
        style={[mt.flexRow, mt.gap(4), mt.w("full")]}
        layout={LinearTransition}
      >
        <FormTextInput 
          name="firstName"
          control={form.control}
          label="Name"
          placeholder="James"
          error={form.formState.errors.firstName}
          viewStyle={[mt.flex1]}
        />
        <FormTextInput 
          name="lastName"
          control={form.control}
          label="Lastname"
          placeholder="Bond"
          error={form.formState.errors.lastName}
          viewStyle={[mt.flex1]}

        />
      </Animated.View>

        <Animated.View
          layout={LinearTransition}
        >
        <Button 
          onPress={form.handleSubmit(onSubmit)}
          loading={verifyEmailMutation.isPending}
          disabled={verifyEmailMutation.isPending}
        >
          <Text>Next</Text>
        </Button>
        </Animated.View>
      <Animated.View style={mtForm.sideText}>
        <Link href="/" style={mtForm.text}>
          Return to Log In
        </Link>
      </Animated.View>
    </Animated.View>
  )
}
