import {
  FlatList,
  Keyboard,
  LayoutChangeEvent,
  ListRenderItemInfo,
  View,
} from 'react-native';
import { Menu } from 'react-native-paper';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import type { ISelect, Item, Value } from './types';
import { ItemSelect } from '../ItemSelect';
import { Input } from '../Input';
const menuContentStyle = { paddingVertical: 0, overflow: 'hidden' as const };
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
  const lastIsSubmit = useRef(false);
  const clean = (cleanText?: boolean) => {
    if (cleanText) {
      setDisplayValue('');
      onChangeText?.('');
    }
    setValue(null as T);
    onDismiss();
  };
  const onChangeTextAutocomplete = (
    v: string,
    isSubmit?: boolean,
    isPress?: boolean
  ) => {
    if (lastIsSubmit.current && isSubmit && !isPress) {
      onDismiss();
      return;
    }
    lastIsSubmit.current = !!isSubmit;
    if (isSubmit && !isPress) {
      const equalItem = list.find(
        (a) => a.label.toLowerCase() === v.trim().toLowerCase()
      );
      const lastItem = list.find((a) => a.value === value);
      const item = equalItem ?? lastItem;
      let text = item?.label ?? '';
      if (v && text) setValue(item?.value as T); //? Si al hacer submit el texto en el input es el mismo que un item o el anterior item está dentro de la lista
      if (v && !text) {
        const nearestItem = list[0];
        if (nearestItem) {
          setValue(nearestItem.value as T); //? Si el ultimo item no es valido y el texto del usuario no coincide con ninguno tomamos el que mas coincida de la lista
          text = nearestItem.label;
        } else {
          clean(true); //? Si no hay ningun item que coincida en lo minimo
          return;
        } //? Si no hay ningun item que coincida en lo minimo
      } else if (!v) {
        clean(); //? si no hay valor cuando se hace submit asumimos que el usuario quiere borrar el valor seleccionado
        return;
      }
      onDismiss();
      setDisplayValue(text);
      onChangeText?.(text);
    } else {
      setDisplayValue(v);
      onChangeText?.(v);
    }
    if (!visible && !isSubmit) anotherProps.showItems();
  };
  useEffect(() => {
    if (isAutoComplete) {
      const val =
        value instanceof Array ? (value[0] as Value) : (value as Value);
      const currentItem = list.find((_) => _.value === val);
      if (currentItem) onChangeTextAutocomplete(currentItem.label, true, true);
    } else if (multiSelect) {
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
      if (isAutoComplete) return currentValue === value;
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
        if (currentItem.label.toLowerCase() !== displayValue.toLowerCase()) {
          setValue(currentValue as T);
          onChangeTextAutocomplete(currentItem.label, true, true);
        }
        onDismiss();
        Keyboard.dismiss();
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
        contentStyle={menuContentStyle}
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
