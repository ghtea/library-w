import {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from "react"

type IntersectionObserverConfig = IntersectionObserverInit & {
}

type IntersectionObserverReturn = {
  entry: IntersectionObserverEntry | undefined
  visible: boolean
  onceVisible: boolean
  element: HTMLDivElement | null
  setElement: Dispatch<SetStateAction<HTMLDivElement | null>>
  ref: (element: HTMLDivElement | null) => void
}

export const useIntersectionObserver = (
  config?: IntersectionObserverConfig,
): IntersectionObserverReturn => {
  const {
    threshold = 0,
    root = null,
    rootMargin = "0%",
  } = config || {}

  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [visible, setVisible] = useState(false)
  const [onceVisible, setOnceVisible] = useState(false)

  const ref: IntersectionObserverReturn["ref"] = useCallback((element)=>{
    if (element){
      setElement(element)
    }
  },[])
  
  const updateEntry = useCallback(([entry]: IntersectionObserverEntry[]) => {
    setEntry(entry)
  },[])

  useEffect(()=>{
    if (entry && entry.isIntersecting){
      setVisible(true)
      setOnceVisible(true)
    } else {
      setVisible(false)
    }
  },[entry])

  useEffect(() => {
    const node = element // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || !node) return

    const observerParams = {threshold, root, rootMargin}
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => {
      observer.disconnect()
      setOnceVisible(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, JSON.stringify(threshold), root, rootMargin])

  return ({
    entry,
    visible,
    onceVisible,
    element,
    setElement,
    ref,
  })
}