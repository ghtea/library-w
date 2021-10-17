import {ChangeEventHandler, useCallback, useEffect, useMemo, useState} from "react"

import {ChipSize,Flex} from "components/atoms"
import {ChipButtonInput, ChipButtonInputItem} from "components/molecules/ChipButtonInput"
import {ColorKey} from "theme"

export type FilterSectionProps = {
  value: FilterValue
  text: (item: FilterValueItem) => string
  onChange: (value: FilterValue) => void
}

export type FilterValue = FilterValueItem[]

export type FilterValueItem = {
  value: any
  selected: boolean
}

export const FilterSection: React.FunctionComponent<FilterSectionProps> = ({
  value,
  onChange = () => {},
  text,
}) => {

  const items: ChipButtonInputItem[] = useMemo(()=>{
    const newItemValueList = value

    return newItemValueList.map(item=>({
      ...item,
      size: ChipSize.MD,
      children: text(item),
    }))
  },[value, text])

  const handleChange = useCallback((newInputItems: ChipButtonInputItem[])=>{
    const selectedValueList = newInputItems
      .filter(item=>item.selected)
      .map(filteredItem => filteredItem.value)

    const newFilterValue: FilterValue = [...value].map(item => ({
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
