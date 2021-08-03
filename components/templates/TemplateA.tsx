import { useCallback, useEffect, useMemo, useState } from "react"

import { Box, Button,Flex } from "components/atoms"
import { Responsive } from "components/atoms/Box"
import { IconButton } from "components/molecules"
import { Sx } from "libraries/theme-ui"
import {ColorKey} from "theme/colors"
import {zIndex} from "theme/others"
import sizes from "theme/sizes"

export type TemplateAProps = {
  
}


export const TemplateA: React.FunctionComponent<TemplateAProps> = ({
  children
}) => {

  const navBarSx: Sx = useMemo(()=>({
    zIndex: zIndex.navBar,
    position: "fixed", 
    backgroundColor: ColorKey["nav.bg"],
    borderColor: ColorKey["nav.border"],
  }),[]);

  return ( 
    <Flex sx={{backgroundColor: ColorKey.background, color: ColorKey.text}}>

      <Box responsive={Responsive.SMALL} 
        sx={{
          ...navBarSx,
          top: "0", 
          width: "100%",
          height: sizes["templateA.topNav.height"],
          borderBottomStyle: "solid", 
          borderBottomWidth: "1px", 
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
          ...navBarSx,
          left: "0", 
          width: sizes["templateA.leftNav.width"],
          height: "100vh",
          borderRightStyle: "solid", 
          borderRightWidth: "1px", 
        }} 
      >
        <Flex 
          sx={{
            height: "100%",
            flexDirection: "column", 
            justifyContent: "space-between",
            alignItems: "center",
          }} 
        >
          <Box>
            <Flex sx={{size: sizes["templateA.leftNav.width"], justifyContent: "center", alignItems: "center"}}>
              <IconButton src={"svgs/bao-house.svg"}></IconButton>
            </Flex> 
          </Box>
          <Box sx={{flex: 1}}>
            <Flex sx={{
              size: sizes["templateA.leftNav.width"], 
              justifyContent: "center", 
              alignItems: "center",
              backgroundColor: ColorKey.primary, 
            }}
            >
              <IconButton 
                src={"svgs/bao-arrow-simple-double-right.svg"}
                sx={{color: ColorKey["primary-partner"]}}
              >
              </IconButton>
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
