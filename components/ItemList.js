import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem, Button, Card } from "react-native-elements";
import { ListContext } from "../context/ListContext";
import ItemOptions from "./ItemOptions";

const ItemList = () => {
  const { lists, activeListIndex, removeItem } = useContext(ListContext);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const activeList = lists[activeListIndex];

  const handleOptionsPress = (index) => {
    setSelectedItemIndex(index);
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listName}>{activeList.name}</Text>
        </View>
        {activeList.items.map((item, index) => (
          <ListItem.Swipeable
            key={index}
            leftContent={
              <Button
                title="Options"
                onPress={() => handleOptionsPress(index)}
                buttonStyle={{ minHeight: "100%" }}
              />
            }
            rightContent={
              <Button
                title="Delete"
                onPress={() => removeItem(index)}
                icon={{ name: "delete", color: "white" }}
                buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
              />
            }
          >
            <View style={styles.itemContainer}>
              <View style={styles.amountMeasurementContainer}>
                {item.amount && (
                  <>
                    <Text style={styles.amount}>{item.amount}</Text>
                    <Text style={styles.measurement}>{item.measurement}</Text>
                  </>
                )}
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </View>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        ))}
      </Card>
      {selectedItemIndex !== null && (
        <ItemOptions
          item={activeList.items[selectedItemIndex]}
          itemIndex={selectedItemIndex}
          onClose={() => setSelectedItemIndex(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  cardContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  listHeader: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginBottom: 10,
  },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
  },
});

export default ItemList;
