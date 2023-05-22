import React from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { TextInput, TouchableRipple } from 'react-native-paper';
import type { TextInputPropsWithoutTheme } from '../Select';
import { useDynamicStyles } from './hooks/useDynamicStyles';
type InputParams = {
  inputProps?: TextInputPropsWithoutTheme;
  disabled?: boolean;
  error?: boolean;
  visible: boolean;
  isAutoComplete?: boolean;
  onChangeText?: (value: string) => void;
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
  isAutoComplete,
  onChangeText,
  ...touchableProps
}: InputParams) => {
  const { activeOutlineColor, activeUnderlineColor, outlineColor } =
    inputProps ?? {};
  const {
    rippleColor,
    activeStyle,
    normalStyle,
    disabledColor,
    textColor,
    defaultBackgroundColor,
    roundness,
  } = useDynamicStyles({
    theme,
    mode,
    activeOutlineColor,
    activeUnderlineColor,
    outlineColor,
    error,
  });
  const inputBackgroundColor = isAutoComplete
    ? defaultBackgroundColor
    : 'transparent';
  const InputRendered = (
    <TextInput
      value={displayValue}
      mode={mode}
      label={label}
      onLayout={isAutoComplete ? touchableProps.onLayout : undefined}
      onChangeText={onChangeText}
      onSubmitEditing={({ nativeEvent }) => onChangeText?.(nativeEvent.text)}
      onEndEditing={({ nativeEvent }) => onChangeText?.(nativeEvent.text)}
      placeholder={placeholder}
      pointerEvents="none"
      onFocus={showItems}
      disabled={disabled}
      theme={theme}
      right={
        <TextInput.Icon
          name={visible ? 'menu-up' : 'menu-down'}
          onPress={showItems}
          color={disabled ? disabledColor : undefined}
        />
      }
      {...inputProps}
      outlineColor="transparent"
      underlineColor="transparent"
      style={[
        {
          color: textColor,
          backgroundColor: inputBackgroundColor,
        },
        containerInputStyle,
        inputProps?.style,
        !isAutoComplete && (visible ? activeStyle : normalStyle),
      ]}
    />
  );
  if (isAutoComplete) return InputRendered;
  return (
    <TouchableRipple
      onPress={disabled ? undefined : showItems}
      rippleColor={rippleColor}
      disabled={disabled}
      style={[
        {
          backgroundColor: defaultBackgroundColor,
          borderRadius: roundness,
          overflow: 'hidden',
        },
        containerInputStyle,
      ]}
      {...touchableProps}
    >
      <View pointerEvents="none">{InputRendered}</View>
    </TouchableRipple>
  );
};
