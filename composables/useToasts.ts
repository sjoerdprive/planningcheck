export type Toast = {
  id: string;
  message: string;
  type?: "success" | "error";
};

export const useToasts = () => {
  const toasts = useState<Toast[]>("toasts", () => []);

  const addToast = ({ message, type }: Omit<Toast, "id">) => {
    const toastId = crypto.randomUUID();
    toasts.value.push({
      message,
      type: type || "success",
      id: toastId,
    });

    setTimeout(() => removeToast(toastId), 3000);
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
};
