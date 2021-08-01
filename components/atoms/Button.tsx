import {Sx,useSx} from "libraries/theme-ui"
import { Button as ThemeUiButton, ButtonProps as ThemeUiButtonProps } from "theme-ui"

export type ButtonProps = Omit<ThemeUiButtonProps, "sx"> & {
    sx?: Sx
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  sx,
  ...rest
}) => {

  const realSx = useSx({
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    background: "none",
    cursor: "pointer",
    px: 1,
    py: 1,
    ...sx,
  })

  return ( 
    <ThemeUiButton {...rest} sx={realSx} />
  );
}