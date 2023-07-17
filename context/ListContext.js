import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const ListContext = createContext();

function ListContextProvider({ children }) {
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState({});

  useEffect(() => {
    fetchActiveList();
    fetchLists();
  }, [])

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://192.168.0.117:3001/lists');
      const fetchedLists = response.data.map((list) => ({
        id: list.id,
        name: list.name,
      }));
      setLists(fetchedLists);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };
 
  const changeActiveList = async (listId) => {
    try {
      // Get the id of the current active list
      const currentActiveListId = activeList.id;
  
      // Update the current active list to set 'active' to false
      await axios.put(`http://192.168.0.117:3001/lists/${currentActiveListId}`, { active: false });
  
      // Update the selected list to set 'active' to true
      await axios.put(`http://192.168.0.117:3001/lists/${listId}`, { active: true });
  
      // Fetch the updated active list
      fetchActiveList();
      
      // Update the active list in the state
  
      // Perform any additional actions with the updated active list
    } catch (error) {
      console.error('Error changing active list:', error);
    }
  };

  const fetchActiveList = async () => {
    try {
      const response = await axios.get('http://192.168.0.117:3001/lists/active');
      const activeList = response.data;
      console.log("response", response.data)
      setActiveList(activeList);
    } catch (error) {
      console.error('Error fetching last list:', error);
    }
  };

  const addItem = async (item) => {
    try {
      const updatedItems = [...activeList.items, item];
  
      // Make API call to update the active list with the new item
      await axios.put(
        `http://192.168.0.117:3001/lists/${activeList.id}`,
        { items: updatedItems },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error adding item:', error);
    }
    fetchActiveList();
  };

  const removeItem = (index) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      const activeList = updatedLists[activeListIndex];
      activeList.items.splice(index, 1);
      return updatedLists;
    });
  };

  const updateItemOptions = async (listId, itemId, item) => {
    try {
      await axios.put(
        `http://192.168.0.117:3001/lists/${listId}/items/${itemId}`,
        { item },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error updating item options:', error);
    }
    fetchActiveList();
  };

  const saveList = async (name, items) => {
    try {
      const newList = { id: uuidv4(), name, items };
      const response = await axios.post(
        'http://192.168.0.117:3001/lists',
        newList,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const savedList = response.data; // Assuming the API returns the saved list object with an updated ID
      setActiveList(savedList);
    } catch (error) {
      console.error('Error saving list:', error);
    }
  };

  const deleteList = (index) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      updatedLists.splice(index, 1);
      return updatedLists;
    });
  };


  return (
    <ListContext.Provider
      value={{
        lists,
        activeList,
        addItem,
        removeItem,
        updateItemOptions,
        saveList,
        deleteList,
        setActiveList,
        fetchLists,
        fetchActiveList,
        changeActiveList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

export default ListContextProvider;
export { ListContext };
