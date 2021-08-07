import React, { useMemo } from "react"

import { Button, ButtonProps, } from "components/atoms/Button";
import { Icon, IconProps } from "components/atoms/Icon";
import { ThemeUIStyleObject } from "theme-ui";

export type IconButtonProps = ButtonProps & Pick<IconProps, "src" | "size"> & {
};

export const IconButton = React.forwardRef<HTMLDivElement, IconButtonProps>(({
  src,
  size,
  sx, 
  ...rest
}, ref) => {
  
  return (
    <Button
      {...rest}
      sx={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        height: "auto",
        px: 3,
        py: 3,
        lineHeight: 0,
        ...sx,
      }}
    > 
      <Icon src={src} size={size} sx={{color: "inherit"}}/>  
    </Button>
  )});

IconButton.displayName = "IconButton";