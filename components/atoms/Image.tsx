import React, {useCallback, useEffect,useState}  from "react";
import {LazyLoadImage, LazyLoadImageProps} from "react-lazy-load-image-component";

// https://www.npmjs.com/package/react-lazy-load-image-component

export type ImageProps = LazyLoadImageProps & {
  fallbackSrc?: string
}

export const Image: React.FunctionComponent<ImageProps> = ({
  src, 
  alt, 
  width = "auto", 
  height = "auto", 
  onError, 
  fallbackSrc, 
  ...rest
}) => {

  const [imageSrc, setImageSrc] = useState("")

  useEffect(()=>{
    if (src){
      setImageSrc(src)
    }
  },[src])

  const handleError = useCallback(()=>{
    if (onError){
      onError
    }
    if (fallbackSrc){
      setImageSrc(fallbackSrc)
    }
  },[fallbackSrc, onError])
  
  return (
    <LazyLoadImage
      alt={alt}
      src={imageSrc}
      width={width} 
      height={height}
      onError={handleError}
      {...rest}
    />
  );
}