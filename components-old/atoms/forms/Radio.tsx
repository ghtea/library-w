import { Radio as ThemeUiRadio, RadioProps as ThemeUiRadioProps } from "theme-ui"

export type RadioProps = ThemeUiRadioProps & {
};

export const Radio: React.FunctionComponent<RadioProps> = (props) => (<ThemeUiRadio {...props}/>);