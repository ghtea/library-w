import React from "react"

import {Flex, FlexProps, Text} from "components/atoms"

export type CardBandProps = FlexProps & {
  title: string
}

export const CardBand: React.FunctionComponent<CardBandProps> = ({
  title,
  ...rest
}) => {
  return (
    <Flex sx={{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      py: "1px",
      ...rest.sx
    }}>
      <Text sx={{
        fontSize: "0.8rem",
        flexGrow: 0,
        letterSpacing: "3px",
        fontWeight: "bold",
      }}>
        {title}
      </Text>
    </Flex>
  )
}