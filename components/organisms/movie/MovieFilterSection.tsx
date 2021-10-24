import {ChangeEventHandler, useCallback, useEffect, useMemo, useState} from "react"

import {Box, Button,ChipSize,Flex} from "components/atoms"
import {ChipButtonInput, ChipButtonInputItem, ChipButtonInputProps} from "components/molecules/ChipButtonInput"
import {MovieFilterValue} from "pages/movie"
import {ColorKey} from "theme"
import {MovieType} from "utils/notion"

export type MovieFilterInputProps = Omit<Partial<ChipButtonInputProps>, "value" | "onChange"> & {
  value: MovieFilterValue
  onChange?: (value: MovieFilterValue) => void
}

export const MovieFilterInput: React.FunctionComponent<MovieFilterInputProps> = ({
  value,
  onChange = () => {},
}) => {

  const items: ChipButtonInputItem[] = useMemo(()=>{
    const newItemValueList = value

    const text = (item: MovieFilterValue[number]) => {
      if (item.value === MovieType.ANIMATION){
        return "Animation"
      }
      else if (item.value === MovieType.SHOOTING){
        return "Shooting"
      }
      else {
        return ""
      }
    }

    return newItemValueList.map(item=>({
      ...item,
      size: ChipSize.MD,
      children: text(item),
    }))
  },[value])

  const handleChange = useCallback((newInputItems: ChipButtonInputItem[])=>{
    const selectedValueList = newInputItems
      .filter(item=>item.selected)
      .map(filteredItem => filteredItem.value)

    const newFilterValue = [...value].map(item => ({
      ...item,
      selected: selectedValueList.includes(item.value),
    }))

    onChange(newFilterValue)
  },[onChange, value])

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
      <ChipButtonInput
        type={"multi-select"}
        items={items}
        onChange={handleChange}
        selectedProps={{
          sx: {
            backgroundColor: ColorKey.primary,
          }
        }}
      ></ChipButtonInput>
    </Flex>
  )
}
