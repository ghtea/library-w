import { useCallback, useEffect, useMemo, useState } from "react"

import { Box,Flex } from "components/atoms"
import { Responsive } from "components/atoms/Box"
import {ColorKey} from "theme/colors"
import {zIndex} from "theme/others"
import sizes from "theme/sizes"
import { useAdvancedRouter } from "tools/router"
import { Sx } from "tools/theme-ui"

import {NavSideBar} from "./NavSideBar"
import {NavTopBar} from "./NavTopBar"


export type TemplateAProps = {
  
}

export type NavItem = {
  id: string;
  svg: string;
}

export const nav: NavItem[] = [
  {
    id: "music",
    svg: "bao-music.svg",
  },
  {
    id: "movie",
    svg: "bao-movie.svg",
  },
  {
    id: "thought",
    svg: "bao-speech-bubble-circle.svg",
  },
  {
    id: "knowledge",
    svg: "bao-book-open.svg",
  },
]


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

      {/* top bar in sm, md */}
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
        <NavTopBar nav={nav} ></NavTopBar>
      </Box>
      
      {/* side bar in lg, xl */}
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
        <NavSideBar nav={nav} ></NavSideBar>
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
