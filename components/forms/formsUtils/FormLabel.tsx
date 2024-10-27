import { formStyles } from "@/styles/formStyleSheet";
import { Text } from "react-native";

interface FormLabelProps {
    label: string;
}

export function FormLabel(
    {
        label
    }: FormLabelProps
) {
    return (
        <Text style={formStyles.inputLabel}>
            {label}
        </Text>
    )
}