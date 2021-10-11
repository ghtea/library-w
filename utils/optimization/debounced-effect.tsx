import {useEffect} from "react";

export const useDebouncedEffect = (callback: Function, deps: unknown[], delay: number) => {
  useEffect(() => {
    const handler = setTimeout(() => callback(), delay);

    return () => clearTimeout(handler);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps || [], delay]);
}



// import { useEffect } from "react"
// import useTimeout from "../2-useTimeout/useTimeout"

// export default function useDebounce(callback, delay, dependencies) {
//   const { reset, clear } = useTimeout(callback, delay)
//   useEffect(reset, [...dependencies, reset])
//   useEffect(clear, [])
// }