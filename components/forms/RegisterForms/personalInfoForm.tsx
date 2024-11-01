import { useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "../formsUtils/FormTextInput";
import { personalInfoSchema, PersonalInfoSchema, FullSchema } from "./registerSchemas";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Animated, { LinearTransition, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { zodResolver } from "@hookform/resolvers/zod";
import { formStyles } from "@/styles/formStyleSheet";
import { useFonts } from "expo-font";

interface PersonalInfoFormProps {
  setTab: (tab: 0 | 1 | 2) => void;
  fullForm: UseFormReturn<FullSchema>
}

export function PersonalInfoForm({
  setTab,
  fullForm
}: PersonalInfoFormProps){

  const fontLoaded = useFonts({
    "Poppins": require("../../../assets/fonts/Poppins-Regular.ttf"),
  })

  if(!fontLoaded) {
    console.log("No font loaded");
  }

  const form = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: fullForm.getValues("personalInfo").firstName,
      lastName: fullForm.getValues("personalInfo").lastName
    }
  })

  function onSubmit(data: PersonalInfoSchema){
    console.log(data);
    fullForm.setValue("personalInfo", data)
    setTab(2)
  }

  return (
    <Animated.View entering={SlideInRight} exiting={SlideOutLeft} layout={LinearTransition} style={formStyles.container}>
      <FormTextInput 
        name="firstName"
        control={form.control}
        label="Nombre"
        placeholder="James"
        error={form.formState.errors.firstName}
      />
      <FormTextInput 
        name="lastName"
        control={form.control}
        label="Apellido"
        placeholder="Bond"
        error={form.formState.errors.lastName}
      />
      <Animated.View layout={LinearTransition}>
        <Button 
          onPress={form.handleSubmit(onSubmit)}
        >
          <Text
            weight="bold"
            size="lg"
          >
            Siguiente
          </Text>
        </Button>
      </Animated.View>
      <Animated.View layout={LinearTransition}>
        <Button 
          onPress={() => setTab(0)}
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