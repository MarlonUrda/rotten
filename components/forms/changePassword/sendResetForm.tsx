import { View, SafeAreaView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import z from "zod"
import { FormTextInput } from "../formsUtils/FormTextInput";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import AuthController from "@/api/controllers/AuthController";
import Animated, { SlideInRight, SlideOutLeft, LinearTransition } from "react-native-reanimated";
import myToast from "@/components/toast";
import { useRouter, Link } from "expo-router";
import { ActivityIndicator } from "react-native";
import mt from "@/styles/mtWind";
import { zodResolver } from "@hookform/resolvers/zod";

const sendResetFormSchema = z.object({
  email: z.string()
  .min(1, "Ingrese un email valido.")
  .max(50, "El email es muy largo")
  .email("Email invalido.")
  .toLowerCase()
  .trim()
})

export default function SendResetForm() {
  const form = useForm<z.infer<typeof sendResetFormSchema>>({
    resolver: zodResolver(sendResetFormSchema),
    defaultValues: {
      email: ""
    }
  })

  const router = useRouter()

  const sendResetMutation = useMutation({
    mutationFn: AuthController.sendResetEmail,
    onError: (err) => {
      myToast({type: "error", message:err.message})
    },
    onSuccess: () => {
      myToast({type: "success", message: "Email sent."})
      router.push("/auth/changePasswordPage")
    }
  })

  const onSubmit = (data: z.infer<typeof sendResetFormSchema>) => {
    sendResetMutation.mutate(data)
    console.log(data);
  }

  return (
    <Animated.View
      layout={LinearTransition}
      style={[mt.w("full"), mt.p(4), mt.flexCol, mt.gap(4)]}
    >
      <FormTextInput
        name="email"
        control={form.control}
        label="Email"
        placeholder="rotten@minds.com"
        error={form.formState.errors.email}
      />

      <Animated.View layout={LinearTransition}>
        <Button
          onPress={form.handleSubmit(onSubmit)}
          disabled={sendResetMutation.isPending}
          loading={sendResetMutation.isPending}
        >
          <Text weight="bold">Send Email</Text>
        </Button>
      </Animated.View>
      <Animated.View
        layout={LinearTransition}
        style={[mt.flexCol, mt.items("flex-end"), mt.w("full")]}
      >
        <Text size="md" style={[mt.align("right")]}>
          Do you remember your password?{" "}
          <Link
            href={"/"}
            style={[
              mt.align("center"),
              mt.color("red", 600),
              mt.fontWeight("black"),
            ]}
          >
            Log In
          </Link>
        </Text>
      </Animated.View>
      {/* if i have a code */}
      <Animated.View
        layout={LinearTransition}
        style={[mt.flexCol, mt.items("flex-end"), mt.w("full")]}
      >
        <Text size="md" style={[mt.align("right")]}>
          Already have a reset code?{" "}
          <Link
            href={"/auth/changePasswordPage"}
            style={[
              mt.align("center"),
              mt.color("red", 600),
              mt.fontWeight("black"),
            ]}
          >
            Change Password
          </Link>
        </Text>
      </Animated.View>
    </Animated.View>
  );
}