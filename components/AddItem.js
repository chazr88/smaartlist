import {
  View,
  TextInput,
  Button,
  Switch,
  StyleSheet,
  Modal,
  Text,
} from "react-native";
import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { ListContext } from "../context/ListContext";
import { Dropdown } from "react-native-element-dropdown";

const AddItem = ({ visible, onClose }) => {
  const [item, setItem] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [amount, setAmount] = useState(null);
  const [measurement, setMeasurement] = useState(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const { addItem } = useContext(ListContext);

  const handleAddItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: uuidv4(),
        name: item.trim(),
        amount,
        measurement,
        isRecurring,
        repeatCount, 
        repeatInterval, 
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

  const toggleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays((prevDays) => prevDays.filter((d) => d !== day));
    } else {
      setSelectedDays((prevDays) => [...prevDays, day]);
    }
  };

  const DayButton = ({ day, isSelected, onToggle }) => (
    <View
      style={[styles.dayButton, isSelected ? styles.dayButtonSelected : null]}
      onStartShouldSetResponder={() => {
        onToggle(day);
        return true;
      }}
    >
      <Text style={styles.dayButtonText}>{day[0]}</Text>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Button title="Close" onPress={onClose} style={styles.button} />
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
            <Text style={styles.recurrenceLabel}>
              Set As Recurring?
            </Text>
            <View style={styles.daysContainer}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <DayButton
                  key={day}
                  day={day}
                  isSelected={selectedDays.includes(day)}
                  onToggle={toggleDaySelection}
                />
              ))}
            </View>
            <Button title="Add" onPress={handleAddItem} style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({


  recurrenceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
  },
  dayButtonSelected: {
    backgroundColor: "#81b0ff",
  },
  dayButtonText: {
    fontSize: 16,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start", // Aligns to the top of the container
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 50, // Add some padding to position it a bit down from the very top
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
    height: 40, // Set a specific height for better control
    borderWidth: 1,
    borderColor: "#e0e0e0", // Lighter border color
    borderRadius: 8, // Rounded corners
    padding: 10,
    marginBottom: 12, // Slightly increased margin
    backgroundColor: "#f9f9f9", // Lighter background color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Android elevation for shadow effect
  },
  dropdown: {
    marginVertical: 10,
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: "center",
  },
  placeholderStyle: {
    fontSize: 14,
    textAlign: 'center',
  },
  selectedTextStyle: {
    fontSize: 14,
    textAlign: 'center',
  },
  iconStyle: {
    width: 16,
    height: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  button: {
    borderRadius: 48, // You can adjust this value as per your preference
    overflow: 'hidden', // Ensures the actual button content respects the borderRadius
  },
});

export default AddItem;
