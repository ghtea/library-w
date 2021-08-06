import { Dispatch, SetStateAction,useCallback } from "react"

import { Box, Flex, Link, Text } from "components/atoms"
import { LocalLink } from "components/atoms/LocalLink"
import { Icon,IconButton } from "components/molecules"
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
              <LocalLink key={`nav-item-${item.id}`} sx={{width: "100%"}} to={`/${item.id}`}>
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
                  <Box sx={{ml: 1, flexGrow: 1, flexShrink: 1}}>
                    <Text sx={{fontSize: "0.9rem"}}>
                      {item.text}
                    </Text>
                  </Box>
                </Flex>
              </LocalLink>
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
