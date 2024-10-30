import Animated, { LinearTransition } from "react-native-reanimated";
import z from "zod"
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import { useRouter, Link } from "expo-router";
import myToast from "../toast";
import AuthController from "@/api/controllers/AuthController";
import { FormTextInput, UnstyledFormTextInput } from "./formsUtils/FormTextInput";
import { Button } from "react-native-elements"
import { verifyInstallation } from "nativewind"
import { formStyles } from "@/styles/formStyleSheet";
import { Shadow } from "react-native-shadow-2";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Se debe ingresar un email.")
    .max(50, "El email es muy largo.")
    .email("Email invalido.")
    .toLowerCase()
    .trim(),

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
      router.push("/movies")
    }
  })

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    //loginMutation.mutate(data)
    console.log(data);
    router.push("/movies")
  }
  return (
    <Animated.View style={formStyles.container}>
      <FormTextInput 
        name="email"
        control={form.control}
        label="Email"
        placeholder="example123@gmail.com"
        error={form.formState.errors.email}
      />
      <UnstyledFormTextInput 
        name="password"
        type="password"
        control={form.control}
        label="Contraseña"
        placeholder=""
        error={form.formState.errors.password}
      />
      <Animated.View layout={LinearTransition} style={formStyles.sideText}>
        <Link
          href={"/auth/sendResetPage"}
          style={formStyles.text}
        >
          Olvidé mi contraseña
        </Link>
      </Animated.View>
      <Animated.View layout={LinearTransition}>
        <Shadow stretch startColor="#000" endColor="#000" style={{borderRadius: 16}} distance={2} offset={[5, 4]}>
          <Button 
            onPress={form.handleSubmit(onSubmit)}
            buttonStyle={formStyles.button}
            loading={loginMutation.isPending}
            disabled={loginMutation.isPending}
            title="Iniciar Sesion"
          >
          </Button>
        </Shadow>
      </Animated.View>
      <Animated.View layout={LinearTransition} style={formStyles.sideText}>
        <Link
          href={"/auth/registerPage"}
          style={formStyles.text}
        >
          Crea una cuenta aqui
        </Link>
      </Animated.View>
    </Animated.View>
  )

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16, // p-4 in Tailwind
    display: 'flex',
    flexDirection: 'column',
    gap: 16, // gap-4 in Tailwind
  },
});