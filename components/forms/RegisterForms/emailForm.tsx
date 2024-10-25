import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "../formsUtils/FormTextInput"; 
import Animated, {
  LinearTransition,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { EmailSchema, emailSchema, FullSchema } from "./registerSchemas";
import { useMutation } from "@tanstack/react-query";
import AuthController from "@/api/controllers/AuthController";
import myToast from "@/components/toast";
import { Link } from "expo-router";

interface EmailFormProps {
  setTab: (tab: 0 | 1) => void;
  fullForm: UseFormReturn<FullSchema>;
}

export function EmailForm({ setTab, fullForm }: EmailFormProps) {
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
    setTab(1)
  }

  
}
