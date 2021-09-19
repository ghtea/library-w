import {ChangeEventHandler, useCallback, useEffect, useState} from "react"

import {Box, Button,Flex, Icon, Input,Link, Text} from "components/atoms"
import {LibraryCategory} from "pages"
import {useAdvancedRouter} from "utils/router"

export type AddModalProps = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}


export const AddModal: React.FunctionComponent<AddModalProps> = ({
  value,
  onChange
}) => {
  const {pathSeries} = useAdvancedRouter()

  const [selectedCategory, setSelectedCategory] = useState<LibraryCategory>()

  useEffect(()=>{},[])

  return ( 
    <Flex 
      sx={{
        
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
