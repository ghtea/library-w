import { Spinner as ThemeUiSpinner, SpinnerProps as ThemeUiSpinnerProps } from "theme-ui"

export type SpinnerProps = ThemeUiSpinnerProps & {
};

export const Spinner: React.FunctionComponent<SpinnerProps> = (props) => (<ThemeUiSpinner {...props}/>);