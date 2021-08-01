import {Sx,useSx} from "libraries/theme-ui"
import { Box as ThemeUiBox, BoxProps as ThemeUiBoxProps } from "theme-ui"

export type BoxProps = Omit<ThemeUiBoxProps, "sx"> & {
    sx?: Sx
};


export const Box: React.FunctionComponent<BoxProps> = ({
  sx,
  ...rest
}) => {

  const realSx = useSx(sx)

  return (
    <ThemeUiBox {...rest} sx={realSx} />
  )
};