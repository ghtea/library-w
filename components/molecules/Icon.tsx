import { ReactSVG } from 'react-svg'

import { Box, BoxProps } from "components/atoms"
import {ColorKey} from "theme/colors";

export type IconProps = BoxProps & {
  src: string;
};

export const Icon: React.FunctionComponent<IconProps> = ({
  src,
  sx,
  ...rest
}) => {

  return (
    <Box {...rest} sx={{
      size: "24px",
      color: ColorKey.TEXT,
      ...sx
    }} > 
      <ReactSVG src={src} style={{width: "100%", height: "100%"}} />  
    </Box>
  );
}