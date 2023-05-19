import { LayoutChangeEvent, ScrollView } from 'react-native';
import { Menu } from 'react-native-paper';
import React, { useEffect, useState, useCallback } from 'react';
import type { ISelect, Value } from './types';
import { ItemSelect } from '../ItemSelect';
import { Input } from '../Input';
const defaultLayout = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
};
type ListValue = Array<Value> | undefined | null;
export const Select = <T extends Value | ListValue>(props: ISelect<T>) => {
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
    ...anotherProps
  } = props;
  const [displayValue, setDisplayValue] = useState('');
  const [inputLayout, setInputLayout] = useState(defaultLayout);

  const onLayout = (event: LayoutChangeEvent) => {
    setInputLayout(event.nativeEvent.layout);
  };
  useEffect(() => {
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
      if (value instanceof Array) setValue(val as T);
      setDisplayValue(_label ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, multiSelect, value]);
  const isActive = useCallback(
    (currentValue: Value) => {
      if (multiSelect) {
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
    [multiSelect, value]
  );

  const setActive = useCallback(
    (currentValue: Value) => {
      if (multiSelect) {
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
    [multiSelect, value]
  );
  return (
    <Menu
      visible={visible}
      onDismiss={onDismiss}
      theme={theme}
      anchor={
        <Input
          {...anotherProps}
          onLayout={onLayout}
          displayValue={displayValue}
          visible={visible}
        />
      }
      contentStyle={{ paddingVertical: 0, overflow: 'hidden' }}
      style={{
        maxWidth: inputLayout?.width,
        width: inputLayout?.width,
        marginTop: inputLayout?.height + 1,
        ...props.style,
      }}
    >
      <ScrollView
        bounces={false}
        style={{
          height: itemsContainerHeight,
          maxHeight: itemsContainerMaxHeight || 200,
        }}
      >
        {list.map((_item, _index) => (
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
        ))}
      </ScrollView>
    </Menu>
  );
};
