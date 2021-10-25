import {useCallback, useEffect, useState} from "react"

import {Box, Flex, Icon, Link, Text} from "components/atoms"
import {IconButton} from "components/molecules/IconButton"
import {AddModal} from "components/organisms/modal/AddModal"
import {NavItem, TEMPLATE_A_SIDE_BAR_LG_WIDTH, TEMPLATE_A_SIDE_BAR_XL_WIDTH} from "components/templates/TemplateA"
import {ColorKey, sizes} from "theme"
import {useAuthentication} from "utils/authentication"
import {useModal} from "utils/modal"
import {useAdvancedRouter} from "utils/router"

export type SideBarProps = {
  nav: NavItem[];
}

export const SideBar: React.FunctionComponent<SideBarProps> = ({
  nav
}) => {
  const {user, loading} = useAuthentication()
  const {pathSeries} = useAdvancedRouter()
  const {upsertModal} = useModal()

  const [selectedPageId, setSelectedPageId] = useState<string>();

  useEffect(()=>{
    if (selectedPageId !== pathSeries[0]){
      setSelectedPageId(pathSeries[0])
    }
  },[pathSeries, selectedPageId]);

  const getIsActive = useCallback((pageId: string)=>(pageId === selectedPageId),[selectedPageId]) 

  const onClickNavLink = useCallback((clickedPageId: string)=>{
    setSelectedPageId(clickedPageId);
  },[])

  const onClickAdd = useCallback(()=>{
    upsertModal({
      children:(
        <AddModal 
          
        />
      ),
    })
  },[upsertModal])

  return ( 
    <Flex 
      sx={{
        height: "100%",
        width: ["unset", null, TEMPLATE_A_SIDE_BAR_LG_WIDTH, TEMPLATE_A_SIDE_BAR_XL_WIDTH],
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
              <Link key={`nav-item-${item.id}`} sx={{width: "100%"}} to={`/${item.id}`} onClick={()=>onClickNavLink(item.id)}>
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

          <Box>
            <IconButton
              src={ "/svgs/bao-plus.svg"} 
              onClick={onClickAdd}
            ></IconButton>
          </Box>
        </Flex>
      </Box>

      <Box sx={{py: 4}}>
        <Flex sx={{justifyContent: "center", alignItems: "center"}}>
          {user 
            ? (<Link to={"/setting"}><IconButton src={"/svgs/bao-person.svg"} ></IconButton></Link>) 
            : (<Link to={"/auth/signin"}><IconButton src={"/svgs/bao-enter.svg"} ></IconButton></Link>)
          }
        </Flex> 
      </Box>
    </Flex>
  )
}
