import {ChangeEventHandler, useCallback, useEffect, useState} from "react"

import {Box, Button,Flex, Icon, Input,Link, Text} from "components/atoms"
import {ColorKey} from "theme"

export type SearchSectionProps = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const SEARCH_BAR_CONTAINER_HEIGHT = ["64px", "72px", "90px", "90px"]

export const SearchSection: React.FunctionComponent<SearchSectionProps> = ({
  value,
  onChange
}) => {

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
      <Box
        sx={{
          width: ["360px", null, "480px", null],
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: "6px",
          borderColor: ColorKey["search-section.border"],
          backgroundColor: ColorKey["bg"],
          p: 3,
        }}
      >
        <Flex
          sx={{flexDirection: "row"}}
        >
          <Box>
            <Icon src={"/svgs/bao-search.svg"}></Icon>
          </Box>
          <Box
            sx={{
              ml: 3,
            }}
          >
            <Input 
              value={value} 
              onChange={onChange}
              sx={{
                p: 0, 
                fontSize: ["body", null, "lg", null],
                border: "none",
                backgroundColor: "transparent",
                // borderWidth: ["1px", "1px", "2px", "2px"]
              }}
            />
          </Box>
          
        </Flex>
      </Box>
    </Flex>
  )
}
