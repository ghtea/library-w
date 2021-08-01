import { Card as ThemeUiCard, CardProps as ThemeUiCardProps } from "theme-ui"

export type CardProps = ThemeUiCardProps & {
};

export const Card: React.FunctionComponent<CardProps> = (props) => (<ThemeUiCard {...props}/>);