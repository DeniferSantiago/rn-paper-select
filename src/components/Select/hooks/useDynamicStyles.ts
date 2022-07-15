import { useTheme } from 'react-native-paper'
type HookParams = {
  theme?: ReactNativePaper.Theme;
  mode?: "outlined" | "flat";
  activeUnderlineColor?: string;
  activeOutlineColor?: string;
  outlineColor?: string;
  error?: boolean
}
export const useDynamicStyles = ({ theme, mode, activeUnderlineColor, activeOutlineColor, outlineColor, error }: HookParams) => {
  const activeTheme = useTheme();
  const errorColor = theme?.colors.error ?? activeTheme.colors.error;
  const disabledColor = theme?.colors.disabled ?? activeTheme.colors.disabled;
  const textColor = theme?.colors.text ?? activeTheme.colors.text;
  const underlineStyle = {
    borderBottomColor: error ? errorColor : activeUnderlineColor,
    borderBottomWidth: 1,
  };
  const outlineStyle = {
    borderColor: error ? errorColor : activeOutlineColor,
    borderWidth: 1,
  };
  const activeStyle = mode === 'outlined' ? outlineStyle : underlineStyle;
  const rippleColor = error
    ? errorColor
    : activeUnderlineColor ?? activeOutlineColor;
  const normalStyle =
    mode === 'outlined'
      ? {
          borderColor: error ? errorColor : outlineColor,
          borderWidth: 1,
        }
      : undefined;
  return { activeStyle, normalStyle, rippleColor, disabledColor, textColor };
};
