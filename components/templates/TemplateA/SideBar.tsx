import {useCallback} from "react"

import {Box, Flex, Icon, IconSize, Link, Text} from "components/atoms"
import {IconButton} from "components/molecules/IconButton"
import {NavItem, TEMPLATE_A_SIDE_BAR_LG_WIDTH, TEMPLATE_A_SIDE_BAR_MD_WIDTH} from "components/templates/TemplateA"
import {ColorKey, sizes} from "theme"
import {useAdvancedRouter} from "tools/router"

export type SideBarProps = {
  nav: NavItem[];
}

export const SideBar: React.FunctionComponent<SideBarProps> = ({
  nav
}) => {

  const {pathSeries} = useAdvancedRouter()

  const getIsActive = useCallback((pageId: string)=>(pageId === pathSeries[0]),[pathSeries]) 

  return ( 
    <Flex 
      sx={{
        height: "100%",
        width: ["unset", null, TEMPLATE_A_SIDE_BAR_MD_WIDTH, TEMPLATE_A_SIDE_BAR_LG_WIDTH],
        flexDirection: "column", 
        justifyContent: "space-between",
        alignItems: "stretch"
      }} 
    >
      <Box>
        <Flex sx={{justifyContent: "center", alignItems: "center"}}>
          <Box sx={{py: 4}}>
            <Link to={"/"}>
              <IconButton src={"/svgs/bao-house.svg"}></IconButton>
            </Link>
          </Box>
        </Flex> 
      </Box>

      <Box sx={{flex: 1}}>
        <Flex>

          <Flex sx={{alignItems: "flex-start"}}>
            {nav.map(item=>(
              <Link key={`nav-item-${item.id}`} sx={{width: "100%"}} to={`/${item.id}`}>
                <Flex sx={{
                  flexDirection: "row", 
                  justifyContent: "flex-start",
                  px: 4,
                  py: 4,
                  color: getIsActive(item.id) ? ColorKey["primary-partner"] : null,
                  backgroundColor: getIsActive(item.id) ? ColorKey["primary"] : null
                }}>
                  <Icon 
                    src={`/svgs/${item.svg}`}
                    sx={{color: getIsActive(item.id) ? ColorKey["primary-partner"] : null,}}
                  ></Icon>
                  <Box sx={{ml: 3, flexGrow: 1, flexShrink: 1}}>
                    <Text sx={{fontSize: "0.9rem"}}>
                      {item.text}
                    </Text>
                  </Box>
                </Flex>
              </Link>
            ))}
          </Flex>
            
        </Flex>
      </Box>

      <Box sx={{py: 4}}>
        <Flex sx={{justifyContent: "center", alignItems: "center"}}>
          <IconButton src={"/svgs/bao-circle-i.svg"}></IconButton>
        </Flex> 
      </Box>
    </Flex>
  )
}
