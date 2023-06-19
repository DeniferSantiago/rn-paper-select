import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Provider, Text } from 'react-native-paper';
import { Select } from 'rn-paper-select';
const data = [
  { label: 'Coca Cola', value: 1 },
  { label: 'Pepsi', value: 2 },
  { label: 'Fanta', value: 3 },
  { label: 'Sprite', value: 4 },
  { label: 'Coca Cola zero', value: 5 },
];
export default function App() {
  const [show, setShow] = React.useState<boolean>(false);
  const [value, setValue] = React.useState('');
  const [val, setVal] = React.useState<number | null>(null);
  const [show1, setShow1] = React.useState<boolean>(false);
  const [val1, setVal1] = React.useState<number | null>(null);
  const [show2, setShow2] = React.useState<boolean>(false);
  const [val2, setVal2] = React.useState<number | null>(null);
  const [show3, setShow3] = React.useState<boolean>(false);
  const [val3, setVal3] = React.useState<number | null>(null);
  const options = React.useMemo(
    () =>
      data.filter((v) => v.label.toLowerCase().startsWith(value.toLowerCase())),
    [value]
  );
  const customOptions = React.useMemo(
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
    []
  );
  return (
    <Provider>
      <View style={styles.container}>
        <Select
          placeholder="Selecciona"
          mode="outlined"
          isAutoComplete
          visible={show}
          value={val}
          onChangeText={setValue}
          style={styles.select}
          setValue={setVal}
          list={options}
          showItems={() => setShow(true)}
          onDismiss={() => setShow(false)}
        />
        <Select
          placeholder="Selecciona"
          mode="flat"
          multiSelect
          inputProps={{ dense: false }}
          visible={show1}
          value={val1}
          setValue={setVal1}
          style={styles.select}
          list={data}
          showItems={() => setShow1(true)}
          onDismiss={() => setShow1(false)}
        />
        <Select
          placeholder="Selecciona"
          mode="outlined"
          inputProps={{ dense: true }}
          style={styles.select}
          visible={show2}
          value={val2}
          setValue={setVal2}
          list={data}
          showItems={() => setShow2(true)}
          onDismiss={() => setShow2(false)}
        />
        <Select
          placeholder="Selecciona"
          mode="outlined"
          inputProps={{ dense: true }}
          visible={show3}
          value={val3}
          setValue={setVal3}
          list={customOptions}
          showItems={() => setShow3(true)}
          onDismiss={() => setShow3(false)}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfdfdf',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  select: {
    marginBottom: 20,
  },
  itemStyle: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
