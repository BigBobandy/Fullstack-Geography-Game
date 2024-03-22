import { useEffect, useState } from "react";

const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // useEffect that cleans up the timeout
  useEffect(() => {
    let toastTimeout;

    if (showToast) {
      toastTimeout = setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }

    // Cleanup
    return () => {
      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }
    };
  }, [showToast]);

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const closeToast = () => setShowToast(false);

  return { showToast, toastMessage, triggerToast, closeToast };
};

export default useToast;
