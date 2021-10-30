import {Dispatch, SetStateAction,useCallback, useEffect, useMemo, useState} from "react"

import {Box, Flex, FlexProps, Icon, IconSize, Link, Responsive, Text} from "components/atoms"
import {IconButton} from "components/molecules/IconButton"
import {AddModal} from "components/organisms/modal/AddModal"
import {NavItem} from "components/templates/shared"
import {signIn} from "next-auth/client"
import {ColorKey, sizes, zIndex} from "theme"
import {useAuthentication} from "utils/authentication"
import {useModal} from "utils/modal"
import {useAdvancedRouter} from "utils/router"

export type TopBarProps = {
  nav: NavItem[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  containerProps?: FlexProps
}

export const TopBar: React.FunctionComponent<TopBarProps> = ({
  nav, isOpen, setIsOpen, containerProps
}) => {
  const {user} = useAuthentication()
  const {pathSeries} = useAdvancedRouter()
  const {upsertModal} = useModal()

  const [selectedPageId, setSelectedPageId] = useState<string>();

  useEffect(()=>{
    setSelectedPageId(pathSeries[0])
  },[pathSeries]);

  const getIsActive = useCallback((pageId: string)=>(pageId === selectedPageId),[selectedPageId]) 

  const onClickLogIn = useCallback(()=>{
    signIn()
  },[])

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
    <Flex >

      {/* first main row */}
      <Flex 
        sx={{
          flexDirection: "row", 
          justifyContent: "space-between",
          alignItems: "center",
          ...containerProps?.sx
        }} 
      >
        <Box>
          <Flex>
            <Link to={"/"}>
              <IconButton src={"/svgs/bao-house.svg"}></IconButton>
            </Link>
          </Flex> 
        </Box>

        <Box>
          <Flex sx={{flexDirection: "row"}}>

            <Box>
              <IconButton
                src={ isOpen ? "/svgs/bao-arrow-simple-double-down.svg" : "/svgs/bao-arrow-simple-double-up.svg"} 
                onClick={()=>setIsOpen(!isOpen)}
              ></IconButton>
            </Box>

            <Responsive range={"mdOnly"}>
              <Flex sx={{flexDirection: "row", width: "auto"}}>
                {nav.map(item=>(
                  <Link key={`nav-item-${item.id}`} to={`/${item.id}`} onClick={()=>onClickNavLink(item.id)}>
                    <IconButton
                      sx={{
                        color: getIsActive(item.id) ? ColorKey["primary-partner"] : "unset",
                        backgroundColor: getIsActive(item.id) ? ColorKey["primary"] : "unset"
                      }}
                      src={`/svgs/${item.svg}`}
                    >
                    </IconButton>
                  </Link>
                ))}
              </Flex>
            </Responsive>

            <Box>
              <IconButton
                src={ "/svgs/bao-plus.svg"} 
                onClick={onClickAdd}
              ></IconButton>
            </Box>
            
          </Flex>
        </Box>

        <Box> 
          <Flex>
            <Box>
              {user 
                ? (<IconButton src={"/svgs/bao-person.svg"} ></IconButton>) 
                : (<IconButton src={"/svgs/bao-enter.svg"} onClick={onClickLogIn}></IconButton>)
              }
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
