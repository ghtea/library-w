import {useCallback, useEffect, useState} from "react"

import {Box, Button,Flex, Icon, Input,Link, Text} from "components/atoms"
import {IconButton} from "components/molecules/IconButton"
import {NavItem, TEMPLATE_A_TOP_BAR_MD_HEIGHT,TEMPLATE_A_TOP_BAR_SM_HEIGHT} from "components/templates/TemplateA"
import {useAdvancedRouter} from "utils/router"

export type SearchBarProps = {
  
}



export const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  
}) => {
  const {pathSeries} = useAdvancedRouter()


  return ( 
    <Flex 
      sx={{
        flexDirection: "row",
        p: 4,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
      }} 
    >
      <Box>
        <Input value={"test"} 
          sx={{
            p: 3, 
            fontSize: ["1.4rem", "1.6rem", "1.8rem", "1.8rem"],
            borderWidth: ["1px", "1px", "2px", "2px"]
          }}></Input>
      </Box>
      <Box><Button>icon</Button></Box>
    </Flex>
  )
}
