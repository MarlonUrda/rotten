import {
  PasswordResetRequest,
  VerifyCodeRequestSchema
} from "../../../types/api/PasswordReset"
import Animated, { LinearTransition, SlideInRight, SlideOutLeft } from "react-native-reanimated"
import z from "zod"
import { FormTextInput } from "../formsUtils/FormTextInput"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import AuthController from "@/api/controllers/AuthController"
import myToast from "@/components/toast"
import { ActivityIndicator } from "react-native"
import mt from "@/styles/mtWind"

interface VerifyCodeProps {
  setTab: (tab: 0 | 1) => void;
  fullForm: UseFormReturn<PasswordResetRequest>
}

export function VerifyCodeForm({ setTab, fullForm }: VerifyCodeProps) {
  const form = useForm<z.infer<typeof VerifyCodeRequestSchema>>({
    resolver: zodResolver(VerifyCodeRequestSchema),
    defaultValues: {
      code: "",
    },
  })

  const verifyCodeMutation = useMutation({
    mutationFn: AuthController.verifyCode,
    onError: (error) => {
      myToast(false, error.message)
    },
    onSuccess: () => {
      fullForm.setValue("code", form.getValues("code"))
      setTab(1)
    }
  })

  const onSubmit = (data: z.infer<typeof VerifyCodeRequestSchema>) => {
    // verifyCodeMutation.mutate(data)
    setTab(1)
  }

  return (
    <Animated.View layout={LinearTransition} entering={SlideInRight} exiting={SlideOutLeft} style={[mt.w("full"), mt.flexCol, mt.gap(4), mt.p(8), mt.rounded("md")]}>
      <FormTextInput 
        name="code"
        control={form.control}
        label="Codigo de Recuperacion"
        error={form.formState.errors.code}
      />
      <Animated.View layout={LinearTransition}>
        <Button
          onPress={form.handleSubmit(onSubmit)}
        >
          {verifyCodeMutation.isPending ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text weight="bold">
              Verificar
            </Text>
          )}
        </Button>
      </Animated.View>
    </Animated.View>
  )
}