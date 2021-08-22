import {useCallback, useEffect, useMemo, useState} from "react"

import {Box, Flex, Responsive} from "components/atoms"
import {ColorKey,sizes,zIndex} from "theme"
import {Sx} from "tools/theme-ui"

import {SideBar} from "./SideBar"
import {TopBar} from "./TopBar"

export const TEMPLATE_A_SIDE_BAR_MD_WIDTH = 140;
export const TEMPLATE_A_SIDE_BAR_LG_WIDTH = 140;


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
    position: "fixed", 
    zIndex: zIndex.navBar,
    backgroundColor: ColorKey["nav.bg"],
    borderColor: ColorKey["nav.border"],
  }),[]);



  return ( 
    <Flex sx={{backgroundColor: ColorKey.bg, color: ColorKey.text}}>

      {/* top bar in sm, md */}
      <Responsive range={"sm-md"}>
        <Box 
          sx={{
            ...navBarSx,
            top: "0", 
            width: "100%",
            borderBottomStyle: "solid", 
            borderBottomWidth: "1px", 
          }}
        >
          <TopBar nav={nav} isOpen={isOpen} setIsOpen={setIsOpen} ></TopBar>
        </Box>
      </Responsive>
      
      {/* side bar in lg, xl */}
      <Responsive range={"lg-xl"}>
        <Box
          sx={{
            ...navBarSx,
            left: "0", 
            height: "100vh",
            borderRightStyle: "solid", 
            borderRightWidth: "1px", 
          }} 
        >
          <SideBar nav={nav}></SideBar>
        </Box>
      </Responsive>
        
      <Box
        sx={{
          position: "absolute",
          width: [
            "100%", 
            null, 
            `calc(100vw - ${TEMPLATE_A_SIDE_BAR_MD_WIDTH}px)`, 
            `calc(100vw - ${TEMPLATE_A_SIDE_BAR_LG_WIDTH}px)`
          ],
          top: [sizes["templateA.topNav.height"], null, 0, null],
          left: [0, null, TEMPLATE_A_SIDE_BAR_MD_WIDTH, TEMPLATE_A_SIDE_BAR_LG_WIDTH],
        }}
      >
        {children}
      </Box>

    </Flex>
  )
}
