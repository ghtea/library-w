import { useStorage } from "./storage"

export const useLocalStorage = (key:string, defaultValue?: any) => {
  return useStorage(key, defaultValue, window.localStorage)
}