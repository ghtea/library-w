import { AspectRatio as ThemeUiAspectRatio, AspectRatioProps as ThemeUiAspectRatioProps } from "theme-ui"

export type AspectRatioProps = ThemeUiAspectRatioProps & {
};

export const AspectRatio: React.FunctionComponent<AspectRatioProps> = (props) => (<ThemeUiAspectRatio {...props}/>);