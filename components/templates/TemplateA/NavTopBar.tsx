import { Dispatch, SetStateAction,useCallback, useEffect, useMemo, useState } from "react"

import { Box, Button,Flex, Link } from "components/atoms"
import { Responsive } from "components/atoms/Box"
import { IconButton } from "components/molecules"
import {NavItem} from "components/templates/TemplateA"
import {ColorKey} from "theme/colors"
import {zIndex} from "theme/others"
import sizes from "theme/sizes"
import { useAdvancedRouter } from "tools/router"
import { Sx } from "tools/theme-ui"

export type NavTopBarProps = {
  nav: NavItem[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NavTopBar: React.FunctionComponent<NavTopBarProps> = ({
  nav, isOpen, setIsOpen
}) => {

  const {pathSeries} = useAdvancedRouter()

  const getIsActive = useCallback((pageId: string)=>(pageId === pathSeries[0]),[pathSeries]) 

  return ( 
    <Flex >

      {/* first main row */}
      <Flex 
        sx={{
          height: sizes["templateA.topNav.height"],
          flexDirection: "row", 
          justifyContent: "space-between",
          alignItems: "center",
        }} 
      >
        <Box>
          <Flex>
            <Link href={"/"}>
              <IconButton src={"svgs/bao-house.svg"}></IconButton>
            </Link>
          </Flex> 
        </Box>

        <Box>
          <Flex sx={{flexDirection: "row"}}>

            <Box>
              <Flex>
                <IconButton
                  src={ isOpen ? "svgs/bao-arrow-simple-double-down.svg" : "svgs/bao-arrow-simple-double-up.svg"} 
                  onClick={()=>setIsOpen(!isOpen)}
                ></IconButton>
              </Flex>
            </Box>

            <Box responsive={Responsive.MD}>
              <Flex sx={{flexDirection: "row"}}>
                {nav.map(item=>(
                  <Link href={`/${item.id}`}  key={`nav-item-${item.id}`} >
                    <IconButton
                      sx={{
                        color: getIsActive(item.id) ? ColorKey["primary-partner"] : null,
                        backgroundColor: getIsActive(item.id) ? ColorKey["primary"] : null
                      }}
                      src={`svgs/${item.svg}`}
                    >
                    </IconButton>
                  </Link>
                ))}
              </Flex>
            </Box>

          </Flex>
        </Box>

        <Box> 
          <Flex>
            <IconButton src={"svgs/bao-circle-i.svg"}></IconButton>
          </Flex> 
        </Box>

      </Flex>


      {isOpen && (
        <Box>
          open
        </Box>
      )}


    </Flex>
  )
}
