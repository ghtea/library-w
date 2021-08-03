import { useMemo } from "react"

import { Button, ButtonProps, } from "components/atoms";
import { Icon } from "components/molecules";

export type IconButtonProps = ButtonProps & {
    src: string;
};

export const IconButton: React.FunctionComponent<IconButtonProps> = ({
  src,
  sx, 
  ...rest
}) => {

  const iconSx = useMemo(()=>
    (
      {
        height: "100%",
        ...(sx?.color && {color: sx?.color})
      }
    ),[sx])
    
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
  )};