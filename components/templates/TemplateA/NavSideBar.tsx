import { Dispatch, SetStateAction,useCallback } from "react"

import { Box, Flex,Link } from "components/atoms"
import { Icon,IconButton, Text } from "components/molecules"
import {NavItem} from "components/templates/TemplateA"
import { ColorKey } from "theme/colors"
import sizes from "theme/sizes"
import { useAdvancedRouter } from "tools/router"

export type NavSideBarProps = {
  nav: NavItem[];
}

export const NavSideBar: React.FunctionComponent<NavSideBarProps> = ({
  nav
}) => {

  const {pathSeries} = useAdvancedRouter()

  const getIsActive = useCallback((pageId: string)=>(pageId === pathSeries[0]),[pathSeries]) 

  return ( 
    <Flex 
      sx={{
        height: "100%",
        width: sizes["templateA.sideNav.width"],
        flexDirection: "column", 
        justifyContent: "space-between",
        alignItems: "stretch"
      }} 
    >
      <Box>
        <Flex sx={{size: sizes["templateA.sideNav.width"], justifyContent: "center", alignItems: "center"}}>
          <Link href={"/"}>
            <IconButton src={"svgs/bao-house.svg"}></IconButton>
          </Link>
        </Flex> 
      </Box>

      <Box sx={{flex: 1}}>
        <Flex>

          <Flex sx={{alignItems: "flex-start"}}>
            {nav.map(item=>(
              <Link href={`/${item.id}`}  key={`nav-item-${item.id}`} sx={{width: "100%"}}>
                <Flex sx={{
                  flexDirection: "row", 
                  justifyContent: "flex-start",
                  px: 2,
                  py: 2,
                  color: getIsActive(item.id) ? ColorKey["primary-partner"] : null,
                  backgroundColor: getIsActive(item.id) ? ColorKey["primary"] : null
                }}>
                  <Icon 
                    src={`svgs/${item.svg}`}
                    sx={{color: getIsActive(item.id) ? ColorKey["primary-partner"] : null,}}
                  ></Icon>
                  <Box sx={{ml: 1, flexGrow: 1}}>
                    <Text >
                      {item.text}
                    </Text>
                  </Box>
                </Flex>
              </Link>
            ))}
          </Flex>
            
        </Flex>
      </Box>

      <Box> 
        <Flex sx={{size: sizes["templateA.sideNav.width"], justifyContent: "center", alignItems: "center"}}>
          <IconButton src={"svgs/bao-circle-i.svg"}></IconButton>
        </Flex> 
      </Box>
    </Flex>
  )
}
