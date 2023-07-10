import React, { useState, useContext } from 'react';
import { View, TextInput, Modal, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { ListContext } from '../context/ListContext';

const CopyList = ({ onClose }) => {
  const { lists, addList, setActiveList } = useContext(ListContext);
  const activeListIndex = lists.length - 1;
  const activeList = lists[activeListIndex];
  const [newListName, setNewListName] = useState(`${activeList.name} (2)`);

  const handleCopyList = () => {
    addList(newListName, activeList.items);
    console.log('Copyd List:', newListName);
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
            <TextInput
              style={styles.input}
              value={newListName}
              onChangeText={setNewListName}
            />
            <Button title="Save" onPress={handleCopyList} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default CopyList;
