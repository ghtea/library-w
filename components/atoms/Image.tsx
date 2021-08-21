import React, {useEffect,useRef, useState} from "react";
import {LazyLoadImage, LazyLoadImageProps} from "react-lazy-load-image-component";

// https://www.npmjs.com/package/react-lazy-load-image-component



export type ImageProps = LazyLoadImageProps

export const Image: React.FunctionComponent<ImageProps> = ({
  src, alt, width = "auto", height = "auto"
}) => {

  // const imgRef = useRef<HTMLImageElement>(null);
  // const [isLoad, setIsLoad] = useState(false);

  return (
    <LazyLoadImage
      alt={alt}
      height={height}
      src={src}
      width={width} 
    />
  );
}