import { Grid as ThemeUiGrid, GridProps as ThemeUiGridProps } from "theme-ui"

export type GridProps = ThemeUiGridProps & {
};

export const Grid: React.FunctionComponent<GridProps> = (props) => (<ThemeUiGrid {...props}/>);