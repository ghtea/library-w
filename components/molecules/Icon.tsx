import React, { useMemo } from "react";
import { ReactSVG } from 'react-svg'

import { Box, BoxProps } from "components/atoms"
import { ColorKey } from "theme/colors";

export type IconProps = BoxProps & {
  src: string;
};

export const Icon = React.forwardRef<HTMLDivElement, IconProps>((props, ref) => {

  const {
    src,
    sx,
    ...rest
  } = props;

  return (
    <Box 
      ref={ref}
      sx={{
        width: "24px",
        height: "24px",
        color: ColorKey.text,
        lineHeight: 0,
        ...sx
      }} 
      {...rest} 
    > 
      <ReactSVG src={src} style={{width: "100%", height: "100%"}} />  
    </Box>
  );
})

Icon.displayName = "Icon";