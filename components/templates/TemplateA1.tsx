import {useCallback, useEffect, useMemo, useRef, useState} from "react"

import {Box, Flex, Icon,Spinner, SpinnerSize} from "components/atoms"
import {TemplateA} from "components/templates/TemplateA"
import {ColorKey,zIndex} from "theme"
import {useAdvancedRouter} from "utils/router"

import {FilterInput, FilterInputProps} from "../organisms/others/FilterInput"
import {SearchInput, SearchInputProps} from "../organisms/others/SearchInput"

export type TemplateA1Props = {
  loading: boolean
  searchInputProps: SearchInputProps,
  filterInputProps: FilterInputProps
}

export const TemplateA1: React.FunctionComponent<TemplateA1Props> = ({
  loading,
  searchInputProps,
  filterInputProps,
  children,
}) => {
  const {router} = useAdvancedRouter()

  const [fixedBoxHeight, setFixedBoxHeight] = useState(0)
  const [fixedBox, setFixedBox] = useState<HTMLDivElement>()

  const handleRefChange = useCallback((element: HTMLDivElement)=>{
    if (element){
      setFixedBox(element)
    }
  },[])

  const handleResize = useCallback(()=>{
    setFixedBoxHeight(fixedBox?.offsetHeight || 0)
  },[fixedBox])

  useEffect(()=>{
    handleResize()
    if (document){
      document.addEventListener("resize", handleResize)
    }
    return () => {
      document.removeEventListener("resize", handleResize)
    }
  },[handleResize])

  return ( 
    <TemplateA>
      <Flex sx={{flexShrink: 1, flexGrow: 1}}>
        <Flex 
          ref={handleRefChange}
          sx={{
            position: "fixed", 
            zIndex: zIndex.toolBar,
          }}>
          <Flex sx={{
            backgroundColor: ColorKey["tool-bar.bg"],
            borderColor: ColorKey["tool-bar.border"],
            borderWidth: 1,
            borderBottomStyle: "solid",
            p: 4,
          }}>
            <SearchInput {...searchInputProps}/>
          </Flex>
        
          <Flex sx={{
            backgroundColor: ColorKey["tool-bar.bg"],
            borderColor: ColorKey["tool-bar.border"],
            borderWidth: 1,
            borderBottomStyle: "solid",
            p: 3,
          }}>
            <FilterInput {...filterInputProps} />
          </Flex>
        </Flex>
      
        <Flex sx={{
          mt: `${fixedBoxHeight}px`, 
          flexShrink: 1, 
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
        >
          {loading
            ? <Spinner size={SpinnerSize.XL}/>
            : children
          }
        </Flex>
      </Flex>
    </TemplateA>
  )
}
