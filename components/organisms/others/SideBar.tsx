import {useCallback, useEffect, useState} from "react"

import {Box, Flex, FlexProps, Icon, Link, Text} from "components/atoms"
import {IconButton} from "components/molecules/IconButton"
import {AddModal} from "components/organisms/modal/AddModal"
import {NavItem} from "components/templates/shared"
import {ColorKey, sizes} from "theme"
import {useAuthentication} from "utils/authentication"
import {useModal} from "utils/modal"
import {useAdvancedRouter} from "utils/router"

export type SideBarProps = {
  nav: NavItem[];
  containerProps?: FlexProps
}

export const SideBar: React.FunctionComponent<SideBarProps> = ({
  nav,
  containerProps
}) => {
  const {user, loading} = useAuthentication()
  const {pathSeries} = useAdvancedRouter()
  const {upsertModal} = useModal()

  const [selectedPageId, setSelectedPageId] = useState<string>();

  useEffect(()=>{
    setSelectedPageId(pathSeries[0])
  },[pathSeries]);

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
        flexDirection: "column", 
        justifyContent: "space-between",
        alignItems: "stretch",
        ...containerProps?.sx
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
                  <Flex sx={{ml: 4, flexGrow: 1, flexShrink: 1, justifyContent: "center", alignItems: "flex-start"}}>
                    <Text sx={{fontSize: "1rem"}}>
                      {item.text}
                    </Text>
                  </Flex>
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
