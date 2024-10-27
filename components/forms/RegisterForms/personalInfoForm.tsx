import { useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "../formsUtils/FormTextInput";
import { Button } from "react-native-elements";
import { personalInfoSchema, PersonalInfoSchema, FullSchema } from "./registerSchemas";
import Animated, { LinearTransition, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { zodResolver } from "@hookform/resolvers/zod";
import { formStyles } from "@/styles/formStyleSheet";

interface PersonalInfoFormProps {
  setTab: (tab: 0 | 1 | 2) => void;
  fullForm: UseFormReturn<FullSchema>
}

export function PersonalInfoForm({
  setTab,
  fullForm
}: PersonalInfoFormProps){
  const form = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: fullForm.getValues("personalInfo").firstName,
      lastName: fullForm.getValues("personalInfo").lastName
    }
  })

  function onSubmit(data: PersonalInfoSchema){
    console.log(data);
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
          title={"Siguiente"}
          onPress={form.handleSubmit(onSubmit)}
          style={formStyles.button}
        />
      </Animated.View>
      <Animated.View layout={LinearTransition}>
        <Button 
          title={"Volver"}
          onPress={() => setTab(0)}
          style={formStyles.buttonSecondary}
        />
      </Animated.View>
    </Animated.View>
  )
}