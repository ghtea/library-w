import { useRef } from "react";

import { Box, BoxProps } from "components/atoms"
import {ColorKey} from "theme/colors";
import { Text as ThemeUiText, TextProps as ThemeUiTextProps } from "theme-ui"
import {Sx,useSx} from "tools/theme-ui"

export type TextProps = Omit<(ThemeUiTextProps & BoxProps), "sx"> & {
  boxSx: Sx,
  textSx: Sx,
};

export const Text: React.FunctionComponent<TextProps> = ({
  boxSx,
  textSx,
  children,
  ...rest
}) => {

  const boxRef = useRef<HTMLElement>();
  
  const realTextSx = useSx({
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "auto",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    lineHeight: 1.6,
    wordBreak: "break-all",
    ...textSx,
  })

  return (
    <Box {...rest} ref={boxRef} sx={{
      ...boxSx
    }} > 
      <ThemeUiText sx={realTextSx}>{children}</ThemeUiText>  
    </Box>
  );
}