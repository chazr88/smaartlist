import React, { useContext, useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Button, Card, CheckBox } from "react-native-elements";
import { ListContext } from "../context/ListContext";
import { SwipeListView } from "react-native-swipe-list-view";
import {LinearGradient} from 'expo-linear-gradient'; // You'll need to install react-native-linear-gradient library.
import ItemOptions from "./ItemOptions";

const ItemList = () => {
  const { lists, activeList, removeItem } = useContext(ListContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  useEffect(() => {
    setSelectedItems([]); // Reset selected items when active list changes
    setSelectedItemIndex(null); // Reset selected item index when active list changes
  }, [activeList]);


  const handleOptionsPress = (index) => {
    setSelectedItemIndex(index);
  };

  const handleItemToggle = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== index)
      );
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, index]);
    }
  };


  const renderItem = (data, rowMap) => {
    const { item, index } = data;
    return (
          <LinearGradient
          colors={['#e4f1fe', '#8dc6ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.itemContainer}
        >
          <CheckBox
            checked={selectedItems.includes(index)}
            onPressIn={() => handleItemToggle(index)}
            containerStyle={styles.checkboxContainer}
          />
          <View style={styles.amountMeasurementContainer}>
            {item.amount && (
              <>
                <Text style={styles.amount}>{item.amount}</Text>
                <Text style={styles.measurement}>{item.measurement}</Text>
              </>
            )}
          </View>
          <View style={styles.nameContainer}>
            <Text
              style={[
                styles.name,
                selectedItems.includes(index) && styles.strikethrough,
              ]}
            >
              {item.name}
            </Text>
          </View>
          {selectedItemIndex === index && (
            <ItemOptions
              item={item}
              itemIndex={index}
              onClose={() => setSelectedItemIndex(null)}
            />
          )}
        </LinearGradient>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const { index } = data;
    return (
      <View style={styles.rowBack}>
        <View style={styles.backLeftBtn}>
          <TouchableOpacity onPress={() => handleOptionsPress(index)}>
            <Text style={styles.backTextWhite}>Options</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.backRightBtn}>
          <TouchableOpacity onPress={() => removeItem(data.item.id)}>
            <Text style={styles.backTextWhite}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.listHeader}>
        <Text style={styles.listName}>{activeList.name}</Text>
      </View>
      <SwipeListView
        data={activeList.items}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  cardContainer: {
    backgroundColor: "#757575",
    borderRadius: 10,
    overflow: "hidden",
    margin: 5,
    elevation: 5, // Add shadow for Android
    shadowOffset: { width: 1, height: 1 }, // Add shadow for iOS
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  listHeader: {
    backgroundColor: "#e4f1fe",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2, 
  },
  listName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#212121",
  },
  checkboxContainer: {
    margin: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3, // Add shadow for Android
    shadowOffset: { width: 1, height: 1 }, // Add shadow for iOS
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  amountMeasurementContainer: {
    flexDirection: "row",
    marginRight: 10,
    width: 80,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 4,
  },
  measurement: {
    fontSize: 16,
  },
  name: {
    fontSize: 16,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: "red",
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backLeftBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50, // Adjust the percentage according to your needs
    width: 75,
    backgroundColor: '#0092ca',
    left: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50, // Adjust the percentage according to your needs
    width: 75,
    backgroundColor: '#F47373',
    right: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  backTextWhite: {
    color: '#FFF'
  }
});
export default ItemList;
