import { useCallback, useEffect, useMemo, useState } from "react"

import { Box, Button,Flex, Link } from "components/atoms"
import { Responsive } from "components/atoms/Box"
import { IconButton } from "components/molecules"
import {NavItem} from "components/templates/TemplateA"
import {ColorKey} from "theme/colors"
import {zIndex} from "theme/others"
import sizes from "theme/sizes"
import { Sx } from "tools/theme-ui"

export type NavTopBarProps = {
  nav: NavItem[];
}

export const NavTopBar: React.FunctionComponent<NavTopBarProps> = ({
  nav
}) => {

  return ( 
    <Flex 
      sx={{
        height: "100%",
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
      }} 
    >
      <Box>
        <Flex>
          <IconButton src={"svgs/bao-house.svg"}></IconButton>
        </Flex> 
      </Box>
      <Box>
        <Flex>
          <IconButton src={"svgs/bao-arrow-simple-double-down.svg"}></IconButton>
        </Flex>
      </Box>
      <Box> 
        <Flex>
          <IconButton src={"svgs/bao-circle-i.svg"}></IconButton>
        </Flex> 
      </Box>
    </Flex>
  )
}
