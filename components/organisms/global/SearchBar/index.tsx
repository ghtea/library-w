import {ChangeEventHandler, useCallback, useEffect, useState} from "react"

import {Box, Button,Flex, Icon, Input,Link, Text} from "components/atoms"
import {IconButton} from "components/molecules/IconButton"
import {NavItem, TEMPLATE_A_TOP_BAR_MD_HEIGHT,TEMPLATE_A_TOP_BAR_SM_HEIGHT} from "components/templates/TemplateA"
import {useInput} from "utils/input"
import {useAdvancedRouter} from "utils/router"

export type SearchBarProps = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}



export const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  value,
  onChange
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
        <Input 
          value={value} 
          onChange={onChange}
          sx={{
            p: 3, 
            fontSize: ["1.3rem", "1.4rem", "1.5rem", "1.6rem"],
            borderWidth: ["1px", "1px", "2px", "2px"]
          }}></Input>
      </Box>
      <Box><Button>icon</Button></Box>
    </Flex>
  )
}
