import React, { useContext } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { ListContext } from '../context/ListContext';

const SelectList = ({ onClose }) => {
  const { lists, changeActiveList } = useContext(ListContext);

  const handleSelectList = async (index) => {
    const selectedList = lists[index];
    await changeActiveList(selectedList.id);
    console.log('Selected List:', selectedList);
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
            {lists.map((list, index) => (
              <TouchableOpacity
                key={index}
                style={styles.listItem}
                onPress={() => handleSelectList(index)}
              >
                <Text style={styles.listName}>{list.name}</Text>
              </TouchableOpacity>
            ))}
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
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listName: {
    fontSize: 16,
  },
});

export default SelectList;
