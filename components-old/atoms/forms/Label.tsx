import { Label as ThemeUiLabel, LabelProps as ThemeUiLabelProps } from "theme-ui"

export type LabelProps = ThemeUiLabelProps & {
};

export const Label: React.FunctionComponent<LabelProps> = (props) => (<ThemeUiLabel {...props}/>);