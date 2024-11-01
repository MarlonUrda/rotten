import { formStyles } from "@/styles/formStyleSheet";
import { Text } from "@/components/ui/text";
import mt from "@/styles/mtWind";

interface FormLabelProps {
    label: string;
}

export function FormLabel(
    {
        label
    }: FormLabelProps
) {
    return (
        <Text style={[mt.fontSize("base"), mt.fontWeight("black")]}>
            {label}
        </Text>
    )
}