'use client';

import { toast, ToastContainer, ToastOptions, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const generalClassName = 'bg-neutral-white text-black rounded-md border text-sm p-1 leading-8 m-2';
const contextClass: Record<TypeOptions, string> = {
  success: `${generalClassName} border-green-500`,
  error: `${generalClassName} border-red-500`,
  info: `${generalClassName} border-blue-500`,
  warning: `${generalClassName} border-yellow-500`,
  default: `${generalClassName} border-blue-500`,
};

const ExpressToastContainer = () => (
  <ToastContainer
    position="top-center"
    hideProgressBar
    newestOnTop
    toastClassName={(context) => contextClass[context?.type || 'default']}
    closeButton={false}
  />
);

const ToastStyles: Record<TypeOptions, ToastOptions> = {
  error: {
    type: 'error',
    // icon:'TODO:'
  },
  info: {
    type: 'info',
    // icon:'TODO:'
  },
  success: {
    type: 'success',
    // icon:'TODO:'
  },
  warning: {
    type: 'warning',
    // icon:'TODO:'
  },
  default: {
    type: 'default',
    // icon:'TODO:'
  },
};

const expressToast = (type: TypeOptions, str: string) => toast(str, ToastStyles[type]);

export default ExpressToastContainer;
export { expressToast };
