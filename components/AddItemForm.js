import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ListContext } from "../context/ListContext";

const AddItemForm = () => {
  const [item, setItem] = useState("");
  const { addItem } = useContext(ListContext);

  const handleAddItem = () => {
    if (item.trim() !== "") {
      addItem({ name: item.trim(), amount: null, measurement: null });
      setItem("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter item"
        value={item}
        onChangeText={setItem}
      />
      <Button title="Add" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});

export default AddItemForm;
