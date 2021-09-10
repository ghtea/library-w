import {useEffect} from "react";

export const useDebouncedEffect = (callback: Function, deps: unknown[], delay: number) => {
  useEffect(() => {
    const handler = setTimeout(() => callback(), delay);

    return () => clearTimeout(handler);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps || [], delay]);
}