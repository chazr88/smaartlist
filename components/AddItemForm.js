import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";
import { v4 as uuidv4 } from "uuid"; // Import the v4 function from the uuid library
import { ListContext } from "../context/ListContext";
import { Dropdown } from 'react-native-element-dropdown';

const AddItemForm = ({ visible, onClose }) => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(null);
  const [measurement, setMeasurement] = useState(null);
  const { addItem } = useContext(ListContext);

  const handleAddItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: uuidv4(), // Generate a unique ID for the item
        name: item.trim(),
        amount,
        measurement,
      };
      addItem(newItem);
      setItem("");
      setAmount(null);
      setMeasurement(null);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Button title="Close" onPress={onClose} />
          </View>
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              placeholder="Enter item"
              value={item}
              onChangeText={setItem}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
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
              placeholder="Select measurement"
              value={measurement}
              onChange={(item) => setMeasurement(item.value)}
            />
            <Button title="Add" onPress={handleAddItem} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  content: {
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  dropdown: {
    marginVertical: 10,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
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
});

export default AddItemForm;
