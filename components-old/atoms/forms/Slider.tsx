import { Slider as ThemeUiSlider, SliderProps as ThemeUiSliderProps } from "theme-ui"

export type SliderProps = ThemeUiSliderProps & {
};

export const Slider: React.FunctionComponent<SliderProps> = (props) => (<ThemeUiSlider {...props}/>);