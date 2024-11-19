import mt from "@/styles/mtWind";
import { toast } from "sonner-native";

interface ToastProps {
  type: "success" | "error" | "info" | "warning";
  message: string;
}

const myToast = ({ type, message }: ToastProps) => {
  const toastOptions = { duration: 3000, style: {  zIndex: 99 } }

  switch (type) {
    case "success":
      return toast.success(message, toastOptions);
    case "error":
      return toast.error(message, toastOptions);
    case "info":
      return toast.info(message, toastOptions);
    case "warning":
      return toast.warning(message, toastOptions);
    default:
      return toast(message, toastOptions);
  }
};

export default myToast;