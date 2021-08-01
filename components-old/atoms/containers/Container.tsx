import { Container as ThemeUiContainer, ContainerProps as ThemeUiContainerProps } from "theme-ui"

export type ContainerProps = ThemeUiContainerProps & {
};

export const Container: React.FunctionComponent<ContainerProps> = (props) => (<ThemeUiContainer {...props}/>);