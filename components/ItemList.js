import React, { useContext, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Card, CheckBox } from "react-native-elements";
import { ListContext } from "../context/ListContext";
import { SwipeListView } from "react-native-swipe-list-view";
import ItemOptions from "./ItemOptions";

const ItemList = () => {
  const { lists, activeListIndex, removeItem } = useContext(ListContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const activeList = lists[activeListIndex];

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
      
      <View style={styles.itemContainer}>
        <CheckBox
          checked={selectedItems.includes(index)}
          onPressIn={() => handleItemToggle(index)}
          containerStyle={styles.checkboxContainer}
        />
        {/* <ListItem>Test</ListItem> */}
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
      </View>
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
          <TouchableOpacity onPress={() => removeItem(index)}>
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
    borderRadius: 10,
    overflow: "hidden",
  },
  listHeader: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
    borderColor: 'grey', // set the border color
    borderWidth: .5,     // set the border width
    marginBottom: ".5%"
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
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backLeftBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: 'blue',
    left: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: 'white', // set the border color
    borderWidth: 2, 
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'white', // set the border color
    borderWidth: 2, 
  },
  backTextWhite: {
    color: '#FFF'
  }
});
export default ItemList;
