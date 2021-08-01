import { useCallback, useEffect, useMemo, useState } from "react"

import { Box, Button,Flex } from "components/atoms"
import { IconButton } from "components/molecules"
import {ColorKey} from "theme/colors"
import sizes from "theme/sizes"

export type TemplateAProps = {
  
}


export const TemplateA: React.FunctionComponent<TemplateAProps> = ({
  children
}) => {
  return ( 
    <Flex sx={{backgroundColor: ColorKey.BACKGROUND, color: ColorKey.TEXT}}>

      <Box sx={{display: ["unset", null, "none", null], width: "100%"}}>
        <Flex sx={{height: sizes["templateA.topNav.height"], width: "100%", flexDirection: "row", justifyContent: "space-between", borderBottomStyle: "solid", borderBottomWidth: "2px", borderColor: "black"}} >
          <Box> W </Box>
          <Box>
            <Flex>
              <IconButton src={"svgs/bao-arrow-simple-double-down.svg"}></IconButton>
            </Flex>
          </Box>
          <Box> ? </Box>
        </Flex>
      </Box>

      <Box sx={{display: ["none", null, "unset", null]}}>
        <Flex>
          big device
        </Flex>
      </Box>
        
      <Box>
        {children}
      </Box>

    </Flex>
  )
}
