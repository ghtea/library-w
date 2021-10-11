import { useState, useEffect } from "react"
import {useEventListener} from "utils/dom"

export const useMediaQuery = (mediaQuery: string) => {
  const [isMatch, setIsMatch] = useState(false)
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList>() // null

  useEffect(() => {
    const list = window.matchMedia(mediaQuery)
    setMediaQueryList(list)
    setIsMatch(list.matches)
  }, [mediaQuery])

// @ts-ignore
  useEventListener("change", (event:any) => setIsMatch(event.matches), mediaQueryList)

  return isMatch
}