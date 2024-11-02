import Animated, { LinearTransition } from "react-native-reanimated";
import z from "zod"
import { ActivityIndicator, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import { useRouter, Link } from "expo-router";
import myToast from "../toast";
import AuthController from "@/api/controllers/AuthController";
import { FormTextInput } from "./formsUtils/FormTextInput";
import {  mtForm } from "@/styles/formStyleSheet";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Se debe ingresar un email.")
    .max(50, "El email es muy largo.")
    .email("Email invalido.")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(50, "La contraseña es muy larga."),
});

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: AuthController.login,
    onError: (error) => {
      myToast(false, error.message)
    },
    onSuccess: (data) => {
      myToast(true, `Bienvenido ${data.user.firstName}`)
      form.reset()
      router.push("/movies")
    }
  })

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    // loginMutation.mutate(data)
    router.push("/movies")
  }
  return (
    <Animated.View style={mtForm.container}>
      <FormTextInput 
        name="email"
        control={form.control}
        label="Email"
        placeholder="example123@gmail.com"
        error={form.formState.errors.email}
      />
      <FormTextInput 
        name="password"
        type="password"
        control={form.control}
        label="Contraseña"
        placeholder=""
        error={form.formState.errors.password}
      />
      <Animated.View layout={LinearTransition} style={mtForm.sideText}>
        <Link
          href={"/auth/sendResetPage"}
          style={mtForm.text}
        >
          Olvidé mi contraseña
        </Link>
      </Animated.View>
      <Animated.View layout={LinearTransition}>
          <Button 
            onPress={form.handleSubmit(onSubmit)}
            disabled={loginMutation.isPending}
            loading={loginMutation.isPending}
          >
            <Text
              weight="bold"
            >
              Iniciar sesión
            </Text>
          </Button>
      </Animated.View>
      <Animated.View layout={LinearTransition} style={mtForm.sideText}>
        <Link
          href={"/auth/registerPage"}
          style={mtForm.text}
        >
          Crea una cuenta aqui
        </Link>
      </Animated.View>
    </Animated.View>
  )

}
