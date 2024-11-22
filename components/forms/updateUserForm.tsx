import Animated, { LinearTransition } from "react-native-reanimated";
import z from "zod"
import { UserFormSchema } from "@/types/api/UserRequest";
import { FormTextInput } from "./formsUtils/FormTextInput";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { useForm } from "react-hook-form";
import { SheetManager } from "react-native-actions-sheet";
import { useAtom } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";
import { useUser } from "@/hooks/app/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { View } from "react-native";
import mt from "@/styles/mtWind";

export default function UpdateUserForm() {
  const [currentUser, setCurrentUser] = useAtom(userAtom)
  const { updateUser } = useUser(currentUser || undefined, setCurrentUser)
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "", 
    }
  })

  const onSubmit = (data: z.infer<typeof UserFormSchema>) => {
    SheetManager.hide("updateUser")
    if(
      currentUser?.firstName === data.firstName &&
      currentUser?.lastName === data.lastName
    ){
      return
    }

    if (currentUser?._id) updateUser(data)
  }

  return (
    <Animated.View style={[mt.flexCol, mt.gap(4), mt.p(4), mt.w("full")]} layout={LinearTransition}>
      <Text size="lg" weight="bold" style={[mt.align("center")]}>
        Update your Profile
      </Text>
      <FormTextInput 
        name="firstName"
        control={form.control}
        placeholder="John"
        label="Name"
        error={form.formState.errors.firstName}
      />
      <FormTextInput 
        name="lastName"
        control={form.control}
        placeholder="Holmes"
        label="Last Name"
        error={form.formState.errors.lastName}
      />
      <Animated.View layout={LinearTransition}>
        <Button variant="success" onPress={form.handleSubmit(onSubmit)}>
          <Text>
            Actualizar datos
          </Text>
        </Button>
      </Animated.View>
      <Animated.View>
        <Button variant="error" onPress={() => SheetManager.hide("updateUser")}>
          <Text>
            Cancel
          </Text>
        </Button>
      </Animated.View>
    </Animated.View>
  )
}