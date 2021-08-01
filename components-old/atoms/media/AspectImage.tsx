import { AspectImage as ThemeUiAspectImage, AspectImageProps as ThemeUiAspectImageProps } from "theme-ui"

export type AspectImageProps = ThemeUiAspectImageProps & {
};

export const AspectImage: React.FunctionComponent<AspectImageProps> = (props) => (<ThemeUiAspectImage {...props}/>);