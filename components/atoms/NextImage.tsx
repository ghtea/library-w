import React, {useMemo} from "react";

import OriginalNextImage, {ImageProps as OriginalNextImageProps} from "next/image"


export type NextImageProps = Omit<OriginalNextImageProps, "className"> & {
  className?: string | string[];
}

// type Src = OriginalNextImageProps["src"]

export const NextImage: React.FunctionComponent<NextImageProps> = ({
  src, width = "auto", height = "auto", className, ...rest
}) => {

  return (
    // @ts-ignore: I think it's bug from 
    <OriginalNextImage
      src={src}
      height={height}
      width={width} 
      {...rest}
    />
  );
}