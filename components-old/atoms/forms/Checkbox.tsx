import { Checkbox as ThemeUiCheckbox, CheckboxProps as ThemeUiCheckboxProps } from "theme-ui"

export type CheckboxProps = ThemeUiCheckboxProps & {
};

export const Checkbox: React.FunctionComponent<CheckboxProps> = (props) => (<ThemeUiCheckbox {...props}/>);