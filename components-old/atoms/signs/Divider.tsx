import { Divider as ThemeUiDivider, DividerProps as ThemeUiDividerProps } from "theme-ui"

export type DividerProps = ThemeUiDividerProps & {
};

export const Divider: React.FunctionComponent<DividerProps> = (props) => (<ThemeUiDivider {...props}/>);