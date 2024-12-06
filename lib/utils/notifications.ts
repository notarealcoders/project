import { toast, ToastOptions } from 'react-hot-toast';

const defaultOptions: ToastOptions = {
  duration: 2000,
  position: 'bottom-right',
};

export const notify = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options });
  },
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options });
  },
};