import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "../formsUtils/FormTextInput"; 
import Animated, {
  LinearTransition,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { EmailSchema, emailSchema, FullSchema } from "./registerSchemas";
import { useMutation } from "@tanstack/react-query";
import AuthController from "@/api/controllers/AuthController";
import myToast from "@/components/toast";
import { Link } from "expo-router";
import { formStyles } from "@/styles/formStyleSheet";
import { Button } from "@/components/ui/button";
import { View } from "react-native";
import { useFonts } from "expo-font";

interface EmailFormProps {
  setTab: (tab: 0 | 1) => void;
  fullForm: UseFormReturn<FullSchema>;
}

export function EmailForm({ setTab, fullForm }: EmailFormProps) {

  const fontLoaded = useFonts({
    "Poppins": require("../../../assets/fonts/Poppins-Regular.ttf"),
  })

  if(!fontLoaded) {
    console.log("No font loaded");
  }

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: fullForm.getValues("email").email,
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: AuthController.verifyEmailAvailability,
    onError: (_) => {
      myToast(false, "Error al verificar el email.");
    },
    onSuccess: (data) => {
      if (!data.available) {
        myToast(false, "El email ya está en uso.");
        return;
      }
      fullForm.setValue("email", { email: form.getValues("email") });
      setTab(1);
    },
  });

  const onSubmit = (data: EmailSchema) => {
    console.log(data);
    fullForm.setValue("email", data)
    setTab(1)
  }

  return (
    <View style={formStyles.container}>
      <FormTextInput 
        name="email"
        control={form.control}
        label="Correo Electronico"
        placeholder="tucorreo@gmail.com"
        error={form.formState.errors.email}
      />
      <View>
        <Button 
          onPress={form.handleSubmit(onSubmit)}
          disabled={verifyEmailMutation.isPending}
        >
          <Text
            weight="bold"
            size="lg"
          >
            Siguiente
          </Text>
        </Button>
      </View>
      <View>
        <Link href="/" style={formStyles.sideText}>
          Volver al inicio de sesion
        </Link>
      </View>
    </View>
  )
}
