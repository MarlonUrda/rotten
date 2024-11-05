import { PasswordResetRequest } from "@/types/api/PasswordReset";
import Animated, { LinearTransition, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import z from "zod"
import { FormTextInput } from "../formsUtils/FormTextInput";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import AuthController from "@/api/controllers/AuthController";
import myToast from "@/components/toast";
import { ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import mt from "@/styles/mtWind";

interface SetPasswordProps {
  setTab: (tab: 0 | 1) => void;
  fullForm: UseFormReturn<PasswordResetRequest>
}

const setPasswordFormSchema = z.object({
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

export function SetPasswordForm({ setTab, fullForm }: SetPasswordProps) {
  const form = useForm<z.infer<typeof setPasswordFormSchema>>({
    resolver: zodResolver(setPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const router = useRouter()

  const sendResetMutation = useMutation({
    mutationFn: AuthController.resetPassword,
    onError: (error) => {
      console.log(error.message)
      myToast(false, error.message)
      setTab(0)
    },
    onSuccess: () => {
      myToast(true, "Contraseña establecida")
      router.push("/")
    }
  })

  const onSubmit = (data: z.infer<typeof setPasswordFormSchema>) => {
    fullForm.setValue("password", form.getValues("password"))
    sendResetMutation.mutate({
      code: fullForm.getValues("code"),
      password: data.password
    })
  }

  return (
    <Animated.View style={[mt.w("full"), mt.p(8), mt.flexCol, mt.gap(4), mt.rounded("lg")]} entering={SlideInRight} exiting={SlideOutLeft} layout={LinearTransition}>
      <FormTextInput 
        name="password"
        control={form.control}
        label="Nueva Contraseña"
        error={form.formState.errors.password}
        type="password"
      />

      <FormTextInput 
        name="confirmPassword"
        control={form.control}
        label="Confirmar Contraseña"
        error={form.formState.errors.confirmPassword}
        type="password"
      />

      <Animated.View layout={LinearTransition}>
        <Button
          onPress={form.handleSubmit(onSubmit)}
        >
          {sendResetMutation.isPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ): (
            <Text>Cambiar Contraseña</Text>
          )}
        </Button>
      </Animated.View>
    </Animated.View>
  )
} 