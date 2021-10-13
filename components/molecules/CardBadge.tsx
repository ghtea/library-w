import { Flex, Text } from "components/atoms"
import React, { useMemo } from "react"
import {ColorKey} from "theme"

export type CardBadgeProps = {
  title: string
  color: ColorKey
}

export const CardBadge: React.FunctionComponent<CardBadgeProps> = ({
  title,
  color
}) => {
  return (
    <Flex sx={{
      flexDirection: "row",
      alignItems: "center",
      height: "32px", 
      px: 3,
      py: 1,
      backgroundColor: color, 
      color: ColorKey["badge.rating.text"],
      opacity: 0.8,
    }}>
      <Text sx={{
        fontSize: "1rem",
        fontWeight: "bold",
      }}>
        {title}
      </Text>
    </Flex>
  )
}