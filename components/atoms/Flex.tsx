import {Sx,useSx} from "libraries/theme-ui"
import { Flex as ThemeUiFlex, FlexProps as ThemeUiFlexProps } from "theme-ui"

export type FlexProps = ThemeUiFlexProps & {
  sx?: Sx
};

export const Flex: React.FunctionComponent<FlexProps> = ({
  sx,
  ...rest
}) => {

  const realSx = useSx({
    flexDirection: "column",
    alignItems: "center",
    ...sx,
  })

  return ( 
    <ThemeUiFlex {...rest} sx={realSx} />
  );
}