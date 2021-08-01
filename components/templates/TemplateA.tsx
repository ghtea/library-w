import { useCallback, useEffect, useMemo, useState } from "react"

import { Box, Button,Flex } from "components/atoms"
import { Responsive } from "components/atoms/Box"
import { IconButton } from "components/molecules"
import {ColorKey} from "theme/colors"
import sizes from "theme/sizes"

export type TemplateAProps = {
  
}


export const TemplateA: React.FunctionComponent<TemplateAProps> = ({
  children
}) => {
  return ( 
    <Flex sx={{backgroundColor: ColorKey.BACKGROUND, color: ColorKey.TEXT}}>

      <Box responsive={Responsive.SMALL} 
        sx={{
          position: "fixed", 
          top: "0", 
          width: "100%",
          height: sizes["templateA.topNav.height"],
          borderBottomStyle: "solid", 
          borderBottomWidth: "1px", 
          borderColor: ColorKey["@#6B7280"]
        }}
      >
        <Flex 
          sx={{
            height: "100%",
            flexDirection: "row", 
            justifyContent: "space-between",
            alignItems: "center",
          }} 
        >
          <Box>
            <Flex>
              <IconButton src={"svgs/bao-house.svg"}></IconButton>
            </Flex> 
          </Box>
          <Box>
            <Flex>
              <IconButton src={"svgs/bao-arrow-simple-double-down.svg"}></IconButton>
            </Flex>
          </Box>
          <Box> 
            <Flex>
              <IconButton src={"svgs/bao-circle-i.svg"}></IconButton>
            </Flex> 
          </Box>
        </Flex>
      </Box>
      
      <Box responsive={Responsive.BIG} 
        sx={{
          position: "fixed", left: "0", 
          width: sizes["templateA.leftNav.width"],
          height: "100vh",
          borderRightStyle: "solid", 
          borderRightWidth: "1px", 
          borderColor: ColorKey["@#6B7280"]
        }} 
      >
        <Flex 
          sx={{
            height: "100%",
            flexDirection: "column", 
            justifyContent: "flex-start",
            alignItems: "center",
          }} 
        >
          <Box>
            <Flex sx={{size: sizes["templateA.leftNav.width"], justifyContent: "center", alignItems: "center"}}>
              <IconButton src={"svgs/bao-house.svg"}></IconButton>
            </Flex> 
          </Box>
          <Box>
            <Flex sx={{size: sizes["templateA.leftNav.width"], justifyContent: "center", alignItems: "center"}}>
              <IconButton src={"svgs/bao-arrow-simple-double-right.svg"}></IconButton>
            </Flex>
          </Box>
          <Box> 
            <Flex sx={{size: sizes["templateA.leftNav.width"], justifyContent: "center", alignItems: "center"}}>
              <IconButton src={"svgs/bao-circle-i.svg"}></IconButton>
            </Flex> 
          </Box>
        </Flex>
      </Box>
        
      <Box
        sx={{
          position: "relative",
          top: [sizes["templateA.topNav.height"], null, 0, null],
          left: [0, null, sizes["templateA.leftNav.width"], null ],
        }}
      >
        {children}
      </Box>

    </Flex>
  )
}
