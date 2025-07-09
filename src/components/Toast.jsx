import { useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

const Toast = () => {
  const { toast, showToast } = useTasks();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        showToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, showToast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
      <div className={`${toast.type === 'error' ? 'toast-error' : 'toast-success'} flex items-center`}>
        <svg
          className={`w-5 h-5 mr-2 ${toast.type === 'error' ? 'text-red-100' : 'text-green-100'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={toast.type === 'error' ? 'M6 18L18 6M6 6l12 12' : 'M5 13l4 4L19 7'}
          />
        </svg>
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;