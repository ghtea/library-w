import {useMemo, useState} from "react"

import {Box, Flex, Responsive, Spinner, SpinnerSize} from "components/atoms"
import {ColorKey,sizes,Sx,zIndex} from "theme"
import {ResponsiveStyleValue} from "theme-ui"
import {useAdvancedRouter} from "utils/router"

import {SideBar} from "./SideBar"
import {TopBar} from "./TopBar"

export const TEMPLATE_A_TOP_BAR_SM_HEIGHT = 48;
export const TEMPLATE_A_TOP_BAR_MD_HEIGHT = 48;
export const TEMPLATE_A_SIDE_BAR_LG_WIDTH = 140;
export const TEMPLATE_A_SIDE_BAR_XL_WIDTH = 140;


export type TemplateAProps = {
  height?: ResponsiveStyleValue<"auto" | "100%">
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
  children, height = "auto"
}) => {
  const {loading} = useAdvancedRouter()

  const [isOpen, setIsOpen] = useState(false);

  const navBarSx: Sx = useMemo(()=>({
    position: "fixed", 
    zIndex: zIndex.navBar,
    backgroundColor: ColorKey["nav-bar.bg"],
    borderColor: ColorKey["nav-bar.border"],
  }),[]);

  return ( 
    <Flex sx={{backgroundColor: ColorKey.bg, color: ColorKey.text, height: height}}>

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
          <TopBar nav={nav} isOpen={isOpen} setIsOpen={setIsOpen}></TopBar>
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
            "100vw", 
            null, 
            `calc(100vw - ${TEMPLATE_A_SIDE_BAR_LG_WIDTH}px)`, 
            `calc(100vw - ${TEMPLATE_A_SIDE_BAR_XL_WIDTH}px)`
          ],
          height: height,
          top: [`${TEMPLATE_A_TOP_BAR_SM_HEIGHT}px`, `${TEMPLATE_A_TOP_BAR_MD_HEIGHT}px`, 0, null],
          left: [0, null, `${TEMPLATE_A_SIDE_BAR_LG_WIDTH}px`, `${TEMPLATE_A_SIDE_BAR_XL_WIDTH}px`],
        }}
      >
        { loading 
          ? (
            <Flex 
              sx={{
                justifyContent: "center", 
                alignItems: "center", 
                height: [`calc(100vh - ${TEMPLATE_A_TOP_BAR_SM_HEIGHT}px)`, `calc(100vh - ${TEMPLATE_A_TOP_BAR_MD_HEIGHT}px)`, "100vh", null]
              }}> 
              <Spinner size={SpinnerSize.XL}/>
            </Flex>
          )
          : children
        }
      </Box>

    </Flex>
  )
}
