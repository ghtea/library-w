import React, { useMemo } from "react"

import { Button, ButtonProps, } from "components/atoms";
import { Icon } from "components/molecules";
import { ThemeUIStyleObject } from "theme-ui";

export type IconButtonProps = ButtonProps & {
    src: string;
};

export const IconButton = React.forwardRef<HTMLDivElement, IconButtonProps>((props, ref) => {

  const {
    src,
    sx, 
    ...rest
  } = props;
  
  const iconSx = useMemo(()=>{

    const {color} = sx;

    return ({
      height: "100%",
      ...( color && {color: color})
    })
  },[sx])
    
  return (
    <Button
      {...rest}
      sx={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        px: 1,
        py: 1,
        lineHeight: 0,
        ...sx,
      }}
    > 
      <Icon src={src} sx={iconSx}/>  
    </Button>
  )});

IconButton.displayName = "IconButton";