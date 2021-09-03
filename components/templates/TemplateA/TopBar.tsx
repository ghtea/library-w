import {Dispatch, SetStateAction,useCallback, useEffect, useMemo, useState} from "react"

import {Box, Flex, Icon, IconSize, Link, Responsive, Text} from "components/atoms"
import {IconButton} from "components/molecules/IconButton"
import {NavItem} from "components/templates/TemplateA"
import {signIn} from "next-auth/client"
import {ColorKey, sizes, zIndex} from "theme"
import {useAuthentication} from "utils/authentication"
import {useRouter} from "utils/router"

export type TopBarProps = {
  nav: NavItem[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TopBar: React.FunctionComponent<TopBarProps> = ({
  nav, isOpen, setIsOpen
}) => {
  const {user} = useAuthentication()

  const {pathSeries} = useRouter()

  const getIsActive = useCallback((pageId: string)=>(pageId === pathSeries[0]),[pathSeries]) 

  const onClickLogIn = useCallback(()=>{
    signIn()
  },[])
  
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
            <Link to={"/"}>
              <IconButton src={"/svgs/bao-house.svg"}></IconButton>
            </Link>
          </Flex> 
        </Box>

        <Box>
          <Flex sx={{flexDirection: "row"}}>

            <Box>
              <Flex>
                <Box>
                  <IconButton
                    src={ isOpen ? "/svgs/bao-arrow-simple-double-down.svg" : "/svgs/bao-arrow-simple-double-up.svg"} 
                    onClick={()=>setIsOpen(!isOpen)}
                  ></IconButton>
                </Box>
              </Flex>
            </Box>

            <Responsive range={"mdOnly"}>
              <Flex sx={{flexDirection: "row"}}>
                {nav.map(item=>(
                  <Link key={`nav-item-${item.id}`} sx={{width: "100%"}} to={`/${item.id}`}>
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
