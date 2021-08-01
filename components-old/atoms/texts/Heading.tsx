import { Heading as ThemeUiHeading, HeadingProps as ThemeUiHeadingProps } from "theme-ui"

export type HeadingProps = ThemeUiHeadingProps & {
};

export const Heading: React.FunctionComponent<HeadingProps> = (props) => (<ThemeUiHeading {...props}/>);