import { useEffect, useState } from "react";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ToastType = "success" | "info" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />,
    info: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    error: <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
  };

  const bgColors = {
    success: "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800",
    info: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800",
    error: "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-slide-in ${bgColors[type]}`}
      role="alert"
      aria-live="polite"
      data-testid={`toast-${type}`}
    >
      {icons[type]}
      <p className="text-sm font-medium text-foreground">{message}</p>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 ml-2"
        onClick={onClose}
        aria-label="Close notification"
        data-testid="button-close-toast"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function useToastNotification() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = "info") => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return { toast, showToast, hideToast };
}
