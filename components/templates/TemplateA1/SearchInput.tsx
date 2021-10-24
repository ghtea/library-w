import {ChangeEventHandler, useCallback, useEffect, useState} from "react"

import {Box, Button,Flex, Icon, Input, Link, Text} from "components/atoms"
import {ColorKey} from "theme"
import {useInput} from "utils/dom"

export type SearchInputProps = {
  input: ReturnType<typeof useInput>
}

// export const SEARCH_BAR_CONTAINER_HEIGHT = ["64px", "72px", "90px", "90px"]

export const SearchInput: React.FunctionComponent<SearchInputProps> = ({
  input
}) => {

  return ( 
    <Flex 
      sx={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      }} 
    >
      <Box
        sx={{
          width: ["360px", null, "480px", null],
          borderWidth: 2,
          borderStyle: "solid",
          borderRadius: "6px",
          borderColor: input.state.focused ? ColorKey["search-section.focus.border"] : ColorKey["search-section.border"],
          backgroundColor: ColorKey["search-section.bg"],
          p: 2,
        }}
      >
        <Flex
          sx={{flexDirection: "row"}}
        >
          <Box
            sx={{
              flexShrink: 0,
              flexGrow: 0,
            }}
          >
            <Icon 
              src={"/svgs/bao-search.svg"}
              sx={{
                color: input.state.focused ? ColorKey["search-section.focus.icon"] : ColorKey["search-section.icon"]
              }}
            />
          </Box>
          <Box
            sx={{
              ml: 3,
              flexShrink: 1,
              flexGrow: 1,
            }}
          >
            <Input 
              {...input.props}
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

