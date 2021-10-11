import {useEventListener} from "./event-listener"

// 
export default function useClickOutside(ref: any, cb: Function) {
  useEventListener(
    "click",
    (e: any) => {
      if (ref.current == null || ref.current.contains(e.target)) return
      cb(e)
    },
    // @ts-ignore
    document
  )
}