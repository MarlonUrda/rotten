import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "../formsUtils/FormTextInput";
import Animated, { LinearTransition, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { PasswordSchema, passwordSchema, FullSchema } from "./registerSchemas";
import AuthController from "@/api/controllers/AuthController";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { RegisterRequest } from "@/types/api/Register";
import myToast from "@/components/toast";
import { formStyles } from "@/styles/formStyleSheet";
import { useFonts } from "expo-font";

interface PasswordFormProps {
  setTab: (tabs: 0 | 1 | 2) => void;
  fullForm: UseFormReturn<FullSchema>
}

export function PasswordForm({ setTab, fullForm }: PasswordFormProps) {
  const router = useRouter()

  const fontLoaded = useFonts({
    "Poppins": require("../../../assets/fonts/Poppins-Regular.ttf"),
  })

  if(!fontLoaded) {
    console.log("No font loaded");
  }

  const form = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const registerMutation = useMutation({
    mutationFn: AuthController.register,
    onError: (error) => {
      console.log(error.message);
      myToast(false, "Error al registrarse")
    },
    onSuccess: () => {
      myToast(true, "Registro exitoso! Bienvenido a Rotten Minds")
      fullForm.reset()
      form.reset()
      setTab(0)
      router.push("/movies")
    }
  })

  const onSubmit = (data: PasswordSchema) => {
    fullForm.setValue("password", data)
    const formData = fullForm.getValues()
    console.log(formData);
    router.push("/movies")
  }

  return (
    <Animated.View entering={SlideInRight} exiting={SlideOutLeft} layout={LinearTransition} style={formStyles.container}>
      <FormTextInput 
        name="password"
        control={form.control}
        label="Contraseña"
        error={form.formState.errors.password}
      />
      <FormTextInput
        name="confirmPassword"
        control={form.control}
        label="Confirmar contraseña"
        error={form.formState.errors.confirmPassword}
      />
      <Animated.View layout={LinearTransition}>
        <Button 
          onPress={form.handleSubmit(onSubmit)}
          variant="success"
          disabled={registerMutation.isPending}
        >
          <Text
            weight="bold"
            size="lg"
          >
            {registerMutation.isPending ? "Registrando...":"Registrate"}
          </Text>
        </Button>
      </Animated.View>
      <Animated.View layout={LinearTransition}>
        <Button 
          onPress={() => setTab(1)}
          variant="secondary"
        >
          <Text
            weight="normal"
            size="lg"
          >
            Volver
          </Text>
        </Button>
      </Animated.View>
    </Animated.View>
  )
}