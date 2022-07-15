import React from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { TextInput, TouchableRipple } from 'react-native-paper';
import type { TextInputPropsWithoutTheme } from '../Select';
import { useDynamicStyles } from '../Select/hooks/useDynamicStyles';
type InputParams = {
  inputProps?: TextInputPropsWithoutTheme;
  disabled?: boolean;
  error?: boolean;
  visible: boolean;
  showItems(): void;
  onLayout(event: LayoutChangeEvent): void;
  theme?: ReactNativePaper.Theme;
  mode?: 'outlined' | 'flat';
  containerInputStyle?: ViewStyle;
  accessibilityLabel?: string;
  displayValue?: string;
  label?: string;
  placeholder?: string;
};
export const Input = ({
  disabled,
  showItems,
  mode,
  theme,
  error,
  inputProps,
  visible,
  displayValue,
  label,
  placeholder,
  containerInputStyle,
  ...touchableProps
}: InputParams) => {
  const { activeOutlineColor, activeUnderlineColor, outlineColor } =
    inputProps as TextInputPropsWithoutTheme;
  const { rippleColor, activeStyle, normalStyle, disabledColor, textColor } =
    useDynamicStyles({
      theme,
      mode,
      activeOutlineColor,
      activeUnderlineColor,
      outlineColor,
      error,
    });
  return (
    <TouchableRipple
      onPress={disabled ? undefined : showItems}
      rippleColor={rippleColor}
      style={containerInputStyle}
      {...touchableProps}
    >
      <View pointerEvents="none">
        <TextInput
          value={displayValue}
          mode={mode}
          label={label}
          placeholder={placeholder}
          pointerEvents="none"
          disabled={disabled}
          theme={theme}
          right={
            <TextInput.Icon
              name={visible ? 'menu-up' : 'menu-down'}
              color={disabled ? disabledColor : undefined}
            />
          }
          {...inputProps}
          outlineColor="transparent"
          style={[
            { color: textColor },
            inputProps?.style,
            visible ? activeStyle : normalStyle,
          ]}
        />
      </View>
    </TouchableRipple>
  );
};
