import { Progress as ThemeUiProgress, ProgressProps as ThemeUiProgressProps } from "theme-ui"

export type ProgressProps = ThemeUiProgressProps & {
};

export const Progress: React.FunctionComponent<ProgressProps> = (props) => (<ThemeUiProgress {...props}/>);