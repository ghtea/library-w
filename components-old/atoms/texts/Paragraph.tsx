import { Paragraph as ThemeUiParagraph, ParagraphProps as ThemeUiParagraphProps } from "theme-ui"

export type ParagraphProps = ThemeUiParagraphProps & {
};

export const Paragraph: React.FunctionComponent<ParagraphProps> = (props) => (<ThemeUiParagraph {...props}/>);