import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-native-paper';
import { Select } from 'rn-paper-select';
const data = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
];
export default function App() {
  const [show, setShow] = React.useState<boolean>(false);
  const [val, setVal] = React.useState<number | null>(null);
  const [show1, setShow1] = React.useState<boolean>(false);
  const [val1, setVal1] = React.useState<number | null>(null);

  return (
    <Provider>
      <View style={styles.container}>
        <Select
          placeholder="Selecciona"
          mode="outlined"
          inputProps={{ dense: true }}
          visible={show}
          value={val}
          setValue={setVal}
          style={styles.select}
          list={data}
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
          list={data}
          showItems={() => setShow1(true)}
          onDismiss={() => setShow1(false)}
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
});
