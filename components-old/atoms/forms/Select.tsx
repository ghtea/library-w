import { Select as ThemeUiSelect, SelectProps as ThemeUiSelectProps } from "theme-ui"

export type SelectProps = ThemeUiSelectProps & {
};

export const Select: React.FunctionComponent<SelectProps> = (props) => (<ThemeUiSelect {...props}/>);