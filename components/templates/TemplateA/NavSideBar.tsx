import { Dispatch, SetStateAction,useCallback } from "react"

import { Box, Flex, Link } from "components/atoms"
import { IconButton } from "components/molecules"
import {NavItem} from "components/templates/TemplateA"
import { ColorKey } from "theme/colors"
import sizes from "theme/sizes"
import { useAdvancedRouter } from "tools/router"

export type NavSideBarProps = {
  nav: NavItem[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NavSideBar: React.FunctionComponent<NavSideBarProps> = ({
  nav, isOpen, setIsOpen
}) => {

  const {pathSeries} = useAdvancedRouter()

  const getIsActive = useCallback((pageId: string)=>(pageId === pathSeries[0]),[pathSeries]) 

  return ( 
    <Flex 
      sx={{
        height: "100%",
        width: !isOpen ? sizes["templateA.leftNav.width"] : sizes["templateA.leftNav.width"] + 100,
        flexDirection: "column", 
        justifyContent: "space-between",
        alignItems: !isOpen ? "center" : "flex-start",
      }} 
    >
      <Box>
        <Flex sx={{size: sizes["templateA.leftNav.width"], justifyContent: "center", alignItems: "center"}}>
          <Link href={"/"}>
            <IconButton src={"svgs/bao-house.svg"}></IconButton>
          </Link>
        </Flex> 
      </Box>

      <Box sx={{flex: 1}}>
        <Flex>

          <Flex>
            <IconButton 
              src={ !isOpen ? "svgs/bao-arrow-simple-double-right.svg" : "svgs/bao-arrow-simple-double-left.svg"} 
              onClick={()=>setIsOpen(!isOpen)}
            >
            </IconButton>
          </Flex>

          <Flex >
            {nav.map(item=>(
              <Link href={`/${item.id}`}  key={`nav-item-${item.id}`} >
                <Flex sx={{flexDirection: "row"}}>
                  <IconButton
                    sx={{
                      color: getIsActive(item.id) ? ColorKey["primary-partner"] : null,
                      backgroundColor: getIsActive(item.id) ? ColorKey["primary"] : null
                    }}
                    src={`svgs/${item.svg}`}
                  ></IconButton>
                  {isOpen && (
                    <Box>
                      {item.text}
                    </Box>
                  )}
                </Flex>
              </Link>
            ))}
          </Flex>
            
        </Flex>
      </Box>

      <Box> 
        <Flex sx={{size: sizes["templateA.leftNav.width"], justifyContent: "center", alignItems: "center"}}>
          <IconButton src={"svgs/bao-circle-i.svg"}></IconButton>
        </Flex> 
      </Box>
    </Flex>
  )
}
