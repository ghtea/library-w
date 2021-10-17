import React, {useMemo} from "react"

import {ButtonProps, Chip, ChipProps} from "components/atoms";

export type ChipButtonProps = Omit<ButtonProps & ChipProps, "value"> & {
  value?: any
};

export const ChipButton = React.forwardRef<HTMLDivElement, ChipButtonProps>(({
  size,
  sx, 
  value,
  disabled = false,
  active,
  ...rest
}, ref) => {
  
  return (
    <Chip
      ref={ref}
      appearance={active ? "flat" : "default"}
      {...rest}
      sx={{
        cursor: disabled ? "unset" : "pointer",
        ...sx,
      }}
    />
  )});

ChipButton.displayName = "ChipButton";