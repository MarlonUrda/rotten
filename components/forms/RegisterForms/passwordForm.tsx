import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "../formsUtils/FormTextInput";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Animated, {
  LinearTransition,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
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
  fullForm: UseFormReturn<FullSchema>;
}

export function PasswordForm({ setTab, fullForm }: PasswordFormProps) {
  const router = useRouter();

  const fontLoaded = useFonts({
    Poppins: require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontLoaded) {
    console.log("No font loaded");
  }

  const form = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: AuthController.register,
    onError: (error) => {
      console.log(error.message);
      myToast({ type: "error", message: error.message});
    },
    onSuccess: () => {
      myToast({ type: "success", message: "Bienvenido a Rotten Minds!" });
      fullForm.reset();
      form.reset();
      setTab(0);
      router.push("/games");
    },
  });

  const onSubmit = (data: PasswordSchema) => {
    fullForm.setValue("password", data);
    const formData = fullForm.getValues();
    const registerData: RegisterRequest = {
      email: formData.info.email,
      password: formData.password.password,
      firstName: formData.info.firstName,
      lastName: formData.info.lastName,
    };
    registerMutation.mutate(registerData);
  };

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      layout={LinearTransition}
      style={formStyles.container}
    >
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
          loading={registerMutation.isPending}
          disabled={registerMutation.isPending}
        >
          <Text>Registrarse</Text>
        </Button>
      </Animated.View>
      <Animated.View layout={LinearTransition}>
        <Button variant="secondary" onPress={() => setTab(0)} >
          <Text>Volver</Text>
        </Button>
      </Animated.View>
    </Animated.View>
  );
}
