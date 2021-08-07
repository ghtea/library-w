import { Dispatch, SetStateAction,useCallback, useEffect, useMemo, useState } from "react"

import { Box } from "components/atoms/Box"
import { Flex } from "components/atoms/Flex"
import { Icon, Size } from "components/atoms/Icon"
import { LocalLink } from "components/atoms/LocalLink"
import { Responsive } from "components/atoms/Responsive"
import { Text } from "components/atoms/Text"
import { IconButton } from "components/molecules/IconButton"
import {NavItem} from "components/templates/TemplateA"
import {ColorKey, sizes, zIndex} from "theme"
import { useAdvancedRouter } from "tools/router"

export type TopBarProps = {
  nav: NavItem[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TopBar: React.FunctionComponent<TopBarProps> = ({
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
            <LocalLink to={"/"}>
              <IconButton src={"svgs/bao-house.svg"}></IconButton>
            </LocalLink>
          </Flex> 
        </Box>

        <Box>
          <Flex sx={{flexDirection: "row"}}>

            <Box>
              <Flex>
                <Box>
                  <IconButton
                    src={ isOpen ? "svgs/bao-arrow-simple-double-down.svg" : "svgs/bao-arrow-simple-double-up.svg"} 
                    onClick={()=>setIsOpen(!isOpen)}
                  ></IconButton>
                </Box>
              </Flex>
            </Box>

            <Responsive range={"mdOnly"}>
              <Flex sx={{flexDirection: "row"}}>
                {nav.map(item=>(
                  <LocalLink key={`nav-item-${item.id}`} sx={{width: "100%"}} to={`/${item.id}`}>
                    <IconButton
                      sx={{
                        color: getIsActive(item.id) ? ColorKey["primary-partner"] : "unset",
                        backgroundColor: getIsActive(item.id) ? ColorKey["primary"] : "unset"
                      }}
                      src={`svgs/${item.svg}`}
                    >
                    </IconButton>
                  </LocalLink>
                ))}
              </Flex>
            </Responsive>
            
          </Flex>
        </Box>

        <Box> 
          <Flex>
            <Box>
              <IconButton src={"svgs/bao-circle-i.svg"}></IconButton>
            </Box>
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
