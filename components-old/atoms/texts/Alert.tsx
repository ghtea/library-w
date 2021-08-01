import { Alert as ThemeUiAlert, AlertProps as ThemeUiAlertProps } from "theme-ui"

export type AlertProps = ThemeUiAlertProps & {
};

export const Alert: React.FunctionComponent<AlertProps> = (props) => (<ThemeUiAlert {...props}/>);