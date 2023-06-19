import {
  FlatList,
  LayoutChangeEvent,
  ListRenderItemInfo,
  View,
} from 'react-native';
import { Menu } from 'react-native-paper';
import React, { useEffect, useState, useCallback } from 'react';
import type { ISelect, Item, Value } from './types';
import { ItemSelect } from '../ItemSelect';
import { Input } from '../Input';
const defaultLayout = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
};
type ListValue = Array<Value> | undefined | null;
export const Select = <T extends Value | ListValue, K extends boolean>(
  props: ISelect<T, K>
) => {
  const {
    multiSelect = false,
    value,
    setValue,
    onDismiss,
    visible,
    list,
    itemsContainerMaxHeight,
    itemsContainerHeight,
    theme,
    onChangeText,
    isAutoComplete,
    ...anotherProps
  } = props;
  const [displayValue, setDisplayValue] = useState('');
  const [inputLayout, setInputLayout] = useState(defaultLayout);

  const onLayout = (event: LayoutChangeEvent) => {
    const l = event.nativeEvent.layout;
    l.height += isAutoComplete && anotherProps.mode === 'outlined' ? 7 : 1;
    if (isAutoComplete) {
      l.width += anotherProps.mode === 'outlined' ? 44 : 36;
    }
    setInputLayout(l);
  };
  const onChangeTextAutocomplete = (v: string) => {
    setDisplayValue(v);
    onChangeText?.(v);
    if (!visible) anotherProps.showItems();
  };
  useEffect(() => {
    if (isAutoComplete) return;
    if (multiSelect) {
      const listVal =
        value instanceof Array ? (value as ListValue) : ([value] as ListValue); //? allow toggle `multiSelect` prop
      const _labels = list
        .filter((_) => (listVal?.indexOf(_.value) ?? -1) !== -1)
        .map((_) => _.label)
        .join(', ');
      setDisplayValue(_labels);
      if (!(value instanceof Array)) setValue(listVal as T);
    } else {
      const val =
        value instanceof Array ? (value[0] as Value) : (value as Value); //? allow toggle `multiSelect` prop
      const _label = list.find((_) => _.value === val)?.label;
      setDisplayValue(_label ?? '');
      if (value instanceof Array) setValue(val as T);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, multiSelect, value]);
  const isActive = useCallback(
    (currentValue: Value) => {
      if (isAutoComplete) return false;
      else if (multiSelect) {
        const val =
          value instanceof Array
            ? (value as ListValue)
            : ([value] as ListValue); //? allow toggle `multiSelect` prop
        const listVal = val;
        return (listVal?.indexOf(currentValue) ?? -1) !== -1;
      } else {
        const val =
          value instanceof Array ? (value[0] as Value) : (value as Value); //? allow toggle `multiSelect` prop
        return val === currentValue;
      }
    },
    [multiSelect, value, isAutoComplete]
  );

  const setActive = useCallback(
    (currentItem: Item) => {
      const currentValue = currentItem.value;
      if (isAutoComplete) {
        currentItem.label.toLowerCase() === displayValue.toLowerCase();
        setValue(currentValue as T);
        setDisplayValue(currentItem.label);
        onChangeText?.(currentItem.label);
        onDismiss();
      } else if (multiSelect) {
        const val =
          value instanceof Array
            ? (value as ListValue)
            : ([value] as ListValue); //? allow toggle `multiSelect` prop
        const listVal = val ?? [];
        const valueIndex = listVal.indexOf(currentValue);
        if (valueIndex === -1) {
          setValue([...listVal, currentValue] as T);
        } else {
          setValue(listVal.filter((v) => v !== currentValue) as T);
        }
      } else {
        setValue(currentValue as T);
        onDismiss?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [multiSelect, value, isAutoComplete]
  );
  const show = visible && !!list.length;
  const renderItem = useCallback(
    ({ item: _item }: ListRenderItemInfo<Item>) => (
      <ItemSelect
        {...anotherProps}
        key={_item.value}
        theme={theme}
        setActive={setActive}
        isActive={isActive(_item.value)}
        item={_item}
        multiSelect={multiSelect}
        width={inputLayout.width}
      />
    ),
    [anotherProps, inputLayout.width, isActive, multiSelect, setActive, theme]
  );
  return (
    <View style={props.style}>
      <Menu
        visible={show}
        onDismiss={onDismiss}
        theme={theme}
        anchor={
          <Input
            {...anotherProps}
            onChangeText={
              isAutoComplete ? onChangeTextAutocomplete : onChangeText
            }
            isAutoComplete={isAutoComplete}
            onLayout={onLayout}
            displayValue={displayValue}
            visible={show}
          />
        }
        contentStyle={{ paddingVertical: 0, overflow: 'hidden' }}
        style={{
          maxWidth: inputLayout?.width,
          width: inputLayout?.width,
          marginTop: inputLayout?.height,
        }}
      >
        <FlatList
          bounces={false}
          keyboardShouldPersistTaps="handled"
          style={{
            height: itemsContainerHeight,
            maxHeight: itemsContainerMaxHeight || 200,
          }}
          data={list}
          keyExtractor={(v, i) => v.value?.toString() || i.toString()}
          renderItem={renderItem}
        />
      </Menu>
    </View>
  );
};
