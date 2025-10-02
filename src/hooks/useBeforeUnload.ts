import { useEffect } from "react";

export default function useBeforeUnloadWarning(unloadHandler: () => void) {
  useEffect(() => {
    window.addEventListener('beforeunload', unloadHandler);

    return () => {
      window.removeEventListener('beforeunload', unloadHandler);
    };
  }, [unloadHandler]);
}