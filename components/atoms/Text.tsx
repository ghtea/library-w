import { Text as ThemeUiText, TextProps as ThemeUiTextProps } from "theme-ui"
import {Sx,useSx} from "tools/theme-ui"

export type TextProps = ThemeUiTextProps & {
    sx?: Sx
};

export const Text: React.FunctionComponent<TextProps> = ({
  sx,
  ...rest
}) => {

  const realSx = useSx({
    ...sx,
  })

  return ( 
    <ThemeUiText {...rest} sx={realSx} />
  );
}