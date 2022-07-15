import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-native-paper';
import { Select } from 'rn-paper-select';
const data = [{ label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3}]
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
          visible={show}
          value={val}
          setValue={setVal}
          list={data}
          showItems={() => setShow(true)}
          onDismiss={() => setShow(false)}
          itemSelectedStyle={{ backgroundColor: "#A7C772" }}
          itemSelectedTextStyle={{ color: '#333333' }}
          itemTextStyle={{ color: '#333333' }}
          itemStyle={{ backgroundColor: "#fff" }}
          error
          containerInputStyle={{ marginBottom: 7, borderRadius: 5, backgroundColor: "#fff" }}
          inputProps={{
            style: styles.input,
            underlineColor: 'transparent',
            activeOutlineColor: "#A7C772"
          }}
        />
        <Select 
          placeholder="Selecciona"
          mode="outlined"
          visible={show1}
          value={val1}
          setValue={setVal1}
          list={data}
          showItems={() => setShow1(true)}
          onDismiss={() => setShow1(false)}
          itemSelectedStyle={{ backgroundColor: "#A7C772" }}
          itemSelectedTextStyle={{ color: '#333333' }}
          itemTextStyle={{ color: '#333333' }}
          itemStyle={{ backgroundColor: "#fff" }}
          containerInputStyle={{ marginBottom: 7, borderRadius: 5, backgroundColor: "#fff" }}
          inputProps={{
            style: styles.input,
            underlineColor: 'transparent',
            activeOutlineColor: "#A7C772"
          }}
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
    paddingHorizontal: 20
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 5
  }
});
