# rn-paper-select
Material Design Select Dropdown Component using React Native Paper

- This module includes a customizable multi-select and a single select component for React Native Paper.
- The package is both Android and iOS compatible.
- The package is well-typed and supports TypeScript.
- Type-safe

Check out the [Example](./example) code or you can check the example source code in [example module](https://github.com/DeniferSantiago/rn-paper-select/tree/master/example).

Inspired by [react-native-paper-select](https://github.com/srivastavaanurag79/react-native-paper-select)

## Installation

```sh
npm install rn-paper-select
```
```sh
yarn add rn-paper-select
```

## Usage Select

```jsx
const data = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
];
const [show, setShow] = React.useState(false);
const [val, setVal] = React.useState(null);
// ...

<Select
  placeholder="Selecciona"
  mode="flat"
  multiSelect={false}
  visible={show}
  value={val}
  setValue={setVal}
  list={data}
  showItems={() => setShow(true)}
  onDismiss={() => setShow(false)}
/>
```

## Usage Autocomplete
```jsx
const data = [
  { label: 'Coca Cola', value: 1 },
  { label: 'Pepsi', value: 2 },
  { label: 'Fanta', value: 3 },
  { label: 'Sprite', value: 4 },
  { label: 'Coca Cola Zero', value: 5 },
];
const [show, setShow] = React.useState(false);
const [value, setValue] = React.useState('');
const [val, setVal] = React.useState(null);
const options = React.useMemo(
  () =>
    data.filter(
      (v) => v.label
        .toLowerCase()
        .startsWith(value.toLowerCase())
    ),
  [value]
);
// ...

<Select
  placeholder="Selecciona"
  mode="outlined"
  isAutoComplete
  visible={show}
  value={val}
  onChangeText={setValue}
  setValue={setVal}
  list={options}
  showItems={() => setShow(true)}
  onDismiss={() => setShow(false)}
/>
```
## Usage with custom item
```jsx
const data = [
  { label: 'Coca Cola', value: 1 },
  { label: 'Pepsi', value: 2 },
  { label: 'Fanta', value: 3 },
  { label: 'Sprite', value: 4 },
  { label: 'Coca Cola Zero', value: 5 },
];
const [show, setShow] = React.useState(false);
const [val, setVal] = React.useState(null);
const options = React.useMemo(
  () =>
    data.map((v) => ({
      ...v,
      custom: (
        <View style={styles.itemStyle}>
          <Text>{v.label}</Text>
          <Text>{v.value}</Text>
        </View>
      ),
    })),
  [value]
);
// ...

<Select
  placeholder="Selecciona"
  mode="outlined"
  visible={show}
  value={val}
  setValue={setVal}
  list={options}
  showItems={() => setShow(true)}
  onDismiss={() => setShow(false)}
/>
```
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
