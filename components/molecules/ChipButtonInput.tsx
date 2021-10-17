import React, {useCallback, useMemo} from "react"

import {Box,ButtonProps, ChipProps, ChipSize, Flex} from "components/atoms";
import {ChipButton, ChipButtonProps} from "components/molecules/ChipButton";
import {Sx} from "theme";

export type ChipButtonInputProps = Omit<ButtonProps & Partial<ChipProps>, "type" | "onChange"> & {
  type?: "select" | "multi-select";
  items: ChipButtonInputItem[];
  onChange?: (items: ChipButtonInputItem[]) => void;
  selectedProps?: Partial<ChipButtonProps>;
};

export type ChipButtonInputItem = Partial<ChipButtonProps> & {
  selected?: boolean;
};

export const ChipButtonInput = React.forwardRef<HTMLDivElement, ChipButtonInputProps>(({
  type,
  onChange = () => {},
  size,
  sx, 
  items,
  disabled = false,
  selectedProps,
  ...rest
}, ref) => {

  const handleClick = useCallback((item, index) => {
    if (type === "multi-select") {
      const newItems = [...items];
      newItems[index].selected = !item.selected;

      onChange(newItems);
    } else if (type === "select") {
      const newItems = items.map((i, idx) => {
        if (idx === index) {
          i.selected = true;
        } else {
          i.selected = false;
        }

        return i;
      });

      onChange(newItems);
    }

    if (item.onClick) {
      item.onClick();
    }
  }, [items, onChange, type]);

  const collectionGapSx = useMemo(()=>{
    const smSx: Sx = {
      margin: "-4px",
    }
    const mdSx: Sx = {
      margin: "-5px",
    }
    const lgSx: Sx = {
      margin: "-6px",
    }
    if (size === ChipSize.SM){
      return smSx
    }
    else if (size === ChipSize.MD){
      return mdSx
    }
    else if (size === ChipSize.LG){
      return lgSx
    }
    else {
      return smSx
    }
  },[size])

  const itemGapSx = useMemo(()=>{
    const smSx: Sx = {
      margin: "4px",
    }
    const mdSx: Sx = {
      margin: "5px",
    }
    const lgSx: Sx = {
      margin: "6px",
    }
    if (size === ChipSize.SM){
      return smSx
    }
    else if (size === ChipSize.MD){
      return mdSx
    }
    else if (size === ChipSize.LG){
      return lgSx
    }
    else {
      return smSx
    }
  },[size])
  
  return (
    <Flex
      sx={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        ...collectionGapSx
      }}
    >
      {items.map((item, index)=>{
        const {
          selected = false, children, value, ...itemRest
        } = item;
        
        return (
          <Box
            sx={{...itemGapSx}}
            key={`chip-button-${value || index}`}
          >
            <ChipButton
              active={selected}
              onClick={() => handleClick(item, index)}
              {...(selected ? selectedProps : {})}
              {...rest}
              {...itemRest}
              sx={{
                ...(selected ? selectedProps?.sx : {}),
                ...sx,
                ...itemRest.sx,
              }}
            >
              {children}
            </ChipButton>
          </Box>
        )})}
    </Flex>
  )});

ChipButtonInput.displayName = "ChipButtonInput";