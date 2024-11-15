import mt from "@/styles/mtWind";
import { toast } from "sonner-native";

const myToast = (succes: boolean, message: string) => {
  if (succes) {
    return toast.success(message, { duration: 3000, style: { borderWidth: 3, borderColor: "#000", zIndex: 99 } });
  }

  return toast.error(message, { duration: 3000, style: { borderWidth: 3, borderColor: "#000", zIndex: 99 } });
};

export default myToast;