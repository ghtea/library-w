import { useStorage } from "./storage"

export const useSessionStorage = (key:string, defaultValue?: any) => {
  return useStorage(key, defaultValue, window.sessionStorage)
}