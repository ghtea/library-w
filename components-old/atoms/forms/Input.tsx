import { Input as ThemeUiInput, InputProps as ThemeUiInputProps } from "theme-ui"

export type InputProps = ThemeUiInputProps & {
};

export const Input: React.FunctionComponent<InputProps> = (props) => (<ThemeUiInput {...props}/>);