import { Message as ThemeUiMessage, MessageProps as ThemeUiMessageProps } from "theme-ui"

export type MessageProps = ThemeUiMessageProps & {
};

export const Message: React.FunctionComponent<MessageProps> = (props) => (<ThemeUiMessage {...props}/>);