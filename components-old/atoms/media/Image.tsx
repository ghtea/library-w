import { Image as ThemeUiImage, ImageProps as ThemeUiImageProps } from "theme-ui"

export type ImageProps = ThemeUiImageProps & {
};

export const Image: React.FunctionComponent<ImageProps> = (props) => (<ThemeUiImage {...props}/>);