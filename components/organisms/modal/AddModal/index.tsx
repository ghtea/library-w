import {ChangeEventHandler, useCallback, useEffect, useMemo, useState} from "react"
import {useMutation} from "react-query"

import {Box, Button,ChipSize,Flex, Input,Link, Text} from "components/atoms"
import {ChipButtonInput, ChipButtonInputItem} from "components/molecules/ChipButtonInput"
import {IconButton} from "components/molecules/IconButton"
import {FilterValue} from "components/organisms/others/FilterInput"
import {LibraryCategory, libraryCategoryText} from "pages"
import {ColorKey} from "theme";
import {MIN_WIDTH} from "theme/breakpoints";
import {ModalProps, useModal} from "utils/modal";
import {createMoviePageByUrl} from "utils/query"
import {useAdvancedRouter} from "utils/router"

export type AddModalProps = ModalProps & {
  // value: string
  // onChange: ChangeEventHandler<HTMLInputElement>
}

type CategoryInputItem = Omit<ChipButtonInputItem, "value"> & {
  value: LibraryCategory
}

export const AddModal: React.FunctionComponent<AddModalProps> = ({
  id,
  // value,
  // onChange
}) => {
  const {removeModal} = useModal()
  const {pathSeries} = useAdvancedRouter()

  const [category, setCategory] = useState<LibraryCategory>(LibraryCategory.MUSIC)
  // TODO: decide default category from path
  
  const mutation = useMutation(({category, link}: {category: LibraryCategory, link: string})=>{
    if (category === LibraryCategory.MOVIE){
      return createMoviePageByUrl({link})
    } else {
      return createMoviePageByUrl({link})
    }
  })

  const handleClose = useCallback(()=>{
    removeModal(id)
  },[id, removeModal])

  const categoryInputItems: CategoryInputItem[] = useMemo(()=>{
    const newItemValueList = Object.values(LibraryCategory)

    return newItemValueList.map(item=>({
      value: item,
      size: ChipSize.MD,
      children: libraryCategoryText(item),
    }))
  },[])

  const onChangeCategory = useCallback((newValue: CategoryInputItem[])=>{
    const newCategory = newValue.find(item => item.selected)?.value
    setCategory(newCategory || LibraryCategory.MUSIC)
  },[])

  const onConfirm = useCallback(()=>{
    mutation.mutate({category: LibraryCategory.MOVIE, link: "https://cinemos.com/film/ghost-in-the-shell/"})
  },[mutation])

  return ( 
    <Flex 
      sx={{
        alignItems: "center",
      }} 
    >
      <Box sx={{
        width: ["100%", null, "640px", null],
        minWidth: MIN_WIDTH,
        backgroundColor: ColorKey["modal.bg"],
        borderColor: ColorKey["modal.border"],
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 4,
      }}>
        <Flex sx={{
          alignItems: "center"
        }}>
          <Flex
            sx={{flexDirection: "row", backgroundColor: ColorKey["modal.header.bg"]}}
          >
            <Flex 
              sx={{
                width: "auto", 
                flexShrink: 1, 
                flexGrow: 1,
                py: 4,
                pl: 5,
                alignItems: "flex-start"
              }}>
              <Text tag={"h2"} sx={{fontSize: "1.2rem"}}>Add Modal</Text> 
            </Flex>
            <Flex sx={{width: "auto", flexShrink: 0, flexGrow: 0}}> 
              <IconButton
                src={"/svgs/bao-x.svg"} 
                onClick={handleClose}
              />
            </Flex>
          </Flex>
          <Flex>
            <Flex>
              <ChipButtonInput
                type={"select"}
                items={categoryInputItems}
                onChange={onChangeCategory}
                selectedProps={{
                  sx: {
                    backgroundColor: ColorKey.primary,
                  }
                }}
              ></ChipButtonInput>
            </Flex>
            {category}
          </Flex>
          <Flex>
            <Button>Add</Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}
