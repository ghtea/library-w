import {useCallback, useEffect,useRef, useState} from "react"

import {Box, BoxProps, Flex, FlexProps, Icon, Link, Text} from "components/atoms"
import throttle from "lodash/throttle"

export type GridProps = {
  itemXlWidth: number
}

export const Grid: React.FunctionComponent<GridProps> = ({
  itemXlWidth,
  children
}) => {
  const [collectionXlWidth, setCollectionXlWidth] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleResize = useCallback(()=>{
    setCollectionXlWidth(Math.floor((containerRef.current?.offsetWidth || 0) / itemXlWidth) * itemXlWidth)
  },[itemXlWidth])

  useEffect(()=>{
    if (!window) return 
    const throttledResize = throttle(handleResize, 500, {leading: true, trailing: true});

    throttledResize();
    window.addEventListener("resize", throttledResize)
    return () => {
      window.removeEventListener("resize", throttledResize)
    }
  },[handleResize])

  return ( 
    <Flex
      ref={containerRef}
      sx={{
        alignItems: "center",
        p: 3,
      }}
    >
      <Flex 
        sx={{
          flexDirection: "row", 
          justifyContent: "flex-start", 
          alignItems: "flex-start",
          flexWrap: "wrap", 
          width: ["100%", null, null, `${collectionXlWidth}px`]
        }}
      >
        {children}
        <Box sx={{flexGrow: 1, flexShrink: 1}}></Box>
      </Flex>
    </Flex>
  )
}
