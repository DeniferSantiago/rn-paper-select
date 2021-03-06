import type { ReactNode, SetStateAction, Dispatch } from "react";
import type { TextStyle, ViewStyle } from "react-native";
import type { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
export type TextInputPropsWithoutTheme = Without<TextInputProps, "theme">;
export type Value = string | number | null
export type Item = {
  value: Value
  label: string
  custom?: ReactNode
}
export interface ISelect<T> {
  visible: boolean;
  multiSelect?: boolean;
  onDismiss(): void;
  showItems(): void;
  disabled?: boolean;
  error?: boolean;
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  label?: string;
  placeholder?: string;
  mode?: "outlined" | "flat";
  inputProps?: TextInputPropsWithoutTheme;
  list: Array<Item>;
  itemsContainerMaxHeight?: number;
  itemsContainerHeight?: number;
  activeColor?: string;
  theme?: ReactNativePaper.Theme;
  containerInputStyle?: ViewStyle;
  style?: ViewStyle;
  itemSelectedTextStyle?: TextStyle;
  itemSelectedStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  accessibilityLabel?: string;
}
