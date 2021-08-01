import { Embed as ThemeUiEmbed, EmbedProps as ThemeUiEmbedProps } from "theme-ui"

export type EmbedProps = ThemeUiEmbedProps & {
};

export const Embed: React.FunctionComponent<EmbedProps> = (props) => (<ThemeUiEmbed {...props}/>);