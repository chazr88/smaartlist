import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ListContextProvider from "./context/ListContext";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";
import CopyList from "./components/CopyList";
import SelectList from "./components/SelectList";
import NewList from "./components/NewList";
import SaveList from "./components/SaveList";
import { Icon, SpeedDial, Modal } from "react-native-elements";

const App = () => {
  const [open, setOpen] = useState(false);
  const [isCopyModalVisible, setIsCopyModalVisible] = useState(false);
  const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
  const [isNewModalVisible, setIsNewModalVisible] = useState(false);
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [isSaveListModalVisible, setIsSaveListModalVisible] = useState(false);

  const openCopyListModal = () => {
    setIsCopyModalVisible(true);
  };

  const closeCopyListModal = () => {
    setIsCopyModalVisible(false);
  };

  const openSelectListModal = () => {
    setIsSelectModalVisible(true);
  };

  const closeSelectListModal = () => {
    setIsSelectModalVisible(false);
  };

  const openNewListModal = () => {
    setIsNewModalVisible(true);
  };

  const closeNewListModal = () => {
    setIsNewModalVisible(false);
  };

  const openAddItemModal = () => {
    setIsAddItemModalVisible(true);
  };

  const closeAddItemModal = () => {
    setIsAddItemModalVisible(false);
  };

  const openSaveListModal = () => {
    setIsSaveListModalVisible(true);
  };

  const closeSaveListModal = () => {
    setIsSaveListModalVisible(false);
  };

  const speedDialStyle = {
    backgroundColor: "#fff", // Replace with your desired color
  };

  return (
    <ListContextProvider>
      <View style={styles.container}>
        <Header />
        <ItemList />

        <SpeedDial
          isOpen={open}
          icon={{ name: "settings", color: "#fff" }}
          openIcon={{ name: "close", color: "#fff" }}
          onOpen={() => setOpen(!open)}
          onClose={() => setOpen(!open)}
          buttonStyle={{backgroundColor: "#8dc6ff"}}
        >
          {/* <SpeedDial.Action
            icon={{ name: "save", color: "#fff" }}
            title="Save List"
            onPress={openSaveListModal}
          /> */}
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            title="New List"
            onPress={openNewListModal}
            buttonStyle={{backgroundColor: "#8dc6ff"}}
          />
          {/* <SpeedDial.Action
            icon={{ name: "save", color: "#fff" }}
            title="Copy List"
            onPress={openCopyListModal}
          /> */}
          <SpeedDial.Action
            icon={{ name: "list", color: "#fff" }}
            title="Select List"
            onPress={openSelectListModal}
            buttonStyle={{backgroundColor: "#8dc6ff"}}
          />
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            title="Add Item"
            onPress={openAddItemModal}
            buttonStyle={{backgroundColor: "#8dc6ff"}}
          />
        </SpeedDial>

        {isCopyModalVisible && <CopyList onClose={closeCopyListModal} />}
        {isSelectModalVisible && <SelectList onClose={closeSelectListModal} />}
        {isNewModalVisible && <NewList onClose={closeNewListModal} />}
        {isAddItemModalVisible && <AddItem onClose={closeAddItemModal} />}
        {isSaveListModalVisible && <SaveList onClose={closeSaveListModal} />}
      </View>
    </ListContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BDBDBD",
  },
});

export default App;
