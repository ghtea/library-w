import { useCallback } from "react"

import { Box, Flex, Link } from "components/atoms"
import { IconButton } from "components/molecules"
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
        <Flex>

          <Flex sx={{
            size: sizes["templateA.leftNav.width"], 
            justifyContent: "center", 
            alignItems: "center",
          }}
          >
            <IconButton 
              src={"svgs/bao-arrow-simple-double-right.svg"}
            >
            </IconButton>
          </Flex>

          <Flex >
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
