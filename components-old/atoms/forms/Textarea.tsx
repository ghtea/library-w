import { Textarea as ThemeUiTextarea, TextareaProps as ThemeUiTextareaProps } from "theme-ui"

export type TextareaProps = ThemeUiTextareaProps & {
};

export const Textarea: React.FunctionComponent<TextareaProps> = (props) => (<ThemeUiTextarea {...props}/>);