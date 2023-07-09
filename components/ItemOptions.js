import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, Modal } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { ListContext } from '../context/ListContext';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const ItemOptions = ({ item, itemIndex, onClose }) => {
  const { updateItemOptions } = useContext(ListContext);
  const [amount, setAmount] = useState(item.amount);
  const [measurement, setMeasurement] = useState(item.measurement);
  const [value, setValue] = useState(null);

  const handleAmountChange = (text) => {
    setAmount(text);
  };

  const handleMeasurementChange = (value) => {
    setMeasurement(value);
  };

  const handleUpdateItemOptions = () => {
    updateItemOptions(itemIndex, amount, measurement);
    onClose();
  };

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Button
              type="clear"
              icon={<Icon name="close" color="#000" />}
              onPress={onClose}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Amount"
                value={amount}
                onChangeText={handleAmountChange}
                containerStyle={styles.input}
              />
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={[
                  { label: 'Pounds', value: 'pounds' },
                  { label: 'Grams', value: 'grams' },
                  // Add more measurement options as needed
                ]}
                labelField="label"
                valueField="value"
                placeholder="Measurement"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                  handleMeasurementChange(item.value);
                }}
              />
            </View>
            <Button
              title="Update"
              onPress={handleUpdateItemOptions}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  content: {
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2196F3',
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default ItemOptions;
