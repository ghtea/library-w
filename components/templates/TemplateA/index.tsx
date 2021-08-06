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
  text: string;
}

export const nav: NavItem[] = [
  {
    id: "music",
    svg: "bao-music.svg",
    text: "Music"
  },
  {
    id: "movie",
    svg: "bao-movie.svg",
    text: "Movie"
  },
  {
    id: "thought",
    svg: "bao-speech-bubble-circle.svg",
    text: "Thought"
  },
  {
    id: "knowledge",
    svg: "bao-book-open.svg",
    text: "Knowledge"
  },
]


export const TemplateA: React.FunctionComponent<TemplateAProps> = ({
  children
}) => {

  const [isOpen, setIsOpen] = useState(false);

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
          borderBottomStyle: "solid", 
          borderBottomWidth: "1px", 
        }}
      >
        <NavTopBar nav={nav} isOpen={isOpen} setIsOpen={setIsOpen} ></NavTopBar>
      </Box>
      
      {/* side bar in lg, xl */}
      <Box responsive={Responsive.BIG} 
        sx={{
          ...navBarSx,
          left: "0", 
          height: "100vh",
          borderRightStyle: "solid", 
          borderRightWidth: "1px", 
        }} 
      >
        <NavSideBar nav={nav}></NavSideBar>
      </Box>
        
      <Box
        sx={{
          position: "relative",
          top: [sizes["templateA.topNav.height"], null, 0, null],
          left: [0, null, sizes["templateA.sideNav.width"], null ],
        }}
      >
        {children}
      </Box>

    </Flex>
  )
}
