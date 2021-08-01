import { Donut as ThemeUiDonut, DonutProps as ThemeUiDonutProps } from "theme-ui"

export type DonutProps = ThemeUiDonutProps & {
};

export const Donut: React.FunctionComponent<DonutProps> = (props) => (<ThemeUiDonut {...props}/>);