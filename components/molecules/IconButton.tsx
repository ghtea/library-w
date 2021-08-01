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
    
  return (
    <Button
      {...rest}
      sx={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        px: 1,
        py: 1,
        ...sx,
      }}
    >  
      <Icon src={src} sx={{height: "100%"}}/>  
    </Button>
  )};