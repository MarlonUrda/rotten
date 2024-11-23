import Toast from "react-native-root-toast";
import s from "@/styles/styleValues";

interface ToastProps {
  type: "success" | "error" | "info" | "warning";
  message: string;
}

const myToast = ({ type, message }: ToastProps) => {
  const toastOptions = { duration: 3000, style: {  zIndex: 99 } }

  switch (type) {
    case "success":
      return toast.success(message);
    case "error":
      return toast.error(message);
    case "info":
      return toast.info(message);
    case "warning":
      return toast.warning(message);
    default:
      return toast.info(message);
  }
};

const toastOptions = {
      textColor: "#000000",
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      opacity: 1
}


const toast = {
  success: (message: string) => {
    Toast.show(message, {
      backgroundColor: s.colors.green[500],
      ...toastOptions
    });
  }
  ,
  error: (message: string) => {
    Toast.show(message, {
      backgroundColor: s.colors.red[500],
      ...toastOptions
    });
  },
  info: (message: string) => {
    Toast.show(message, {
      backgroundColor: s.colors.blue[500],
      ...toastOptions
    });
  },
  warning: (message: string) => {
    Toast.show(message, {
      backgroundColor: s.colors.yellow[500],
      ...toastOptions
    });
  }

}

export default myToast;