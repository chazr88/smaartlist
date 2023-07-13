import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ListContextProvider from "./context/ListContext";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";
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
        >
          <SpeedDial.Action
            icon={{ name: "save", color: "#fff" }}
            title="Save List"
            onPress={openSaveListModal}
          />
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            title="New List"
            onPress={openNewListModal}
          />
          <SpeedDial.Action
            icon={{ name: "save", color: "#fff" }}
            title="Copy List"
            onPress={openCopyListModal}
          />
          <SpeedDial.Action
            icon={{ name: "list", color: "#fff" }}
            title="Select List"
            onPress={openSelectListModal}
          />
          <SpeedDial.Action
            icon={{ name: "add", color: "#fff" }}
            title="Add Item"
            onPress={openAddItemModal}
          />
        </SpeedDial>

        {isCopyModalVisible && <CopyList onClose={closeCopyListModal} />}
        {isSelectModalVisible && <SelectList onClose={closeSelectListModal} />}
        {isNewModalVisible && <NewList onClose={closeNewListModal} />}
        {isAddItemModalVisible && <AddItemForm onClose={closeAddItemModal} />}
        {isSaveListModalVisible && <SaveList onClose={closeSaveListModal} />}
      </View>
    </ListContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E6CB",
  },
});

export default App;
