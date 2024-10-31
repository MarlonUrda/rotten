import { formStyles } from "@/styles/formStyleSheet";
import { Text } from "@/components/ui/text";

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