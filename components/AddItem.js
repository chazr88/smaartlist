import { View, TextInput, Button, Switch, StyleSheet, Modal, Text } from "react-native";
import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { ListContext } from "../context/ListContext";
import { Dropdown } from "react-native-element-dropdown";

const AddItem = ({ visible, onClose }) => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(null);
  const [measurement, setMeasurement] = useState(null);
  const [isRecurring, setIsRecurring] = useState(false); // New state
  const [frequency, setfrequency] = useState(null); // New state
  const [frequencyPeriod, setFrequencyPeriod] = useState(""); // New state
  const { addItem } = useContext(ListContext);

  const handleAddItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: uuidv4(),
        name: item.trim(),
        amount,
        measurement,
        isRecurring, // New field
        repeatCount, // New field
        repeatInterval, // New field
      };
      addItem(newItem);
      setItem("");
      setAmount(null);
      setMeasurement(null);
      setIsRecurring(false); // Reset to default value
      setRepeatCount(null); // Reset to default value
      setRepeatInterval(""); // Reset to default value
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
                { label: "Pounds", value: "pounds" },
                { label: "Grams", value: "grams" },
              ]}
              labelField="label"
              valueField="value"
              placeholder="Select measurement"
              value={measurement}
              onChange={(item) => setMeasurement(item.value)}
            />
            {/* New Switch for setting an item as reoccurring */}
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isRecurring ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={() =>
                  setIsRecurring((previousState) => !previousState)
                }
                value={isRecurring}
              />
            </View>
            {/* New Inputs for recurring items */}
            {isRecurring && (
              <>
                <Text style={styles.label}>Frequency</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1x"
                  value={frequency}
                  onChangeText={setfrequency}
                  keyboardType="numeric"
                />
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={[
                    { label: "Weekly", value: "week" },
                    { label: "Monthly", value: "month" },
                  ]}
                  labelField="label"
                  valueField="value"
                  placeholder="Weekly"
                  value={frequencyPeriod}
                  onChange={(item) => setFrequencyPeriod(item.value)}
                />
              </>
            )}
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
    borderBottomColor: "gray",
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});

export default AddItem;
