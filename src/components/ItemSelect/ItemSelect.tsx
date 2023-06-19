import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import {
  Checkbox,
  Divider,
  Menu,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import type { Item } from '../Select';
type ItemSelectParams = {
  item: Item;
  setActive(v: Item): void;
  isActive: boolean;
  multiSelect: boolean;
  theme?: ReactNativePaper.Theme;
  activeColor?: string;
  itemTextStyle?: TextStyle;
  itemSelectedTextStyle?: TextStyle;
  itemStyle?: ViewStyle;
  itemSelectedStyle?: ViewStyle;
  width: number;
};
const staticStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: { flexShrink: 1 },
  menuItem: {
    flex: 1,
  },
});
export const ItemSelect = ({
  item,
  setActive,
  isActive,
  multiSelect,
  theme,
  activeColor,
  width,
  ...styles
}: ItemSelectParams) => {
  const activeTheme = useTheme();
  const primaryColor = theme?.colors.primary ?? activeTheme.colors.primary;
  const textColor = theme?.colors.text ?? activeTheme.colors.text;
  const color = activeColor ?? primaryColor;
  return (
    <>
      <TouchableRipple
        style={[
          staticStyles.container,
          isActive ? styles.itemSelectedStyle : styles.itemStyle,
        ]}
        onPress={() => setActive(item)}
      >
        <>
          {multiSelect && (
            <Checkbox.Android
              theme={{
                colors: { accent: color },
              }}
              status={isActive ? 'checked' : 'unchecked'}
              onPress={() => setActive(item)}
            />
          )}
          {item.custom && (
            <View
              style={[
                staticStyles.menuItem,
                isActive ? styles.itemSelectedTextStyle : styles.itemTextStyle,
              ]}
            >
              {item.custom}
            </View>
          )}
          {!item.custom && (
            <Menu.Item
              titleStyle={[
                {
                  color: isActive ? color : textColor,
                },
                isActive ? styles.itemSelectedTextStyle : styles.itemTextStyle,
              ]}
              title={item.label}
              style={[staticStyles.menuItem, { width }]}
            />
          )}
        </>
      </TouchableRipple>
      <Divider />
    </>
  );
};
