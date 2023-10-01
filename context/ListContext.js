import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const ListContext = createContext();
const url = "https://smaart-list-api.onrender.com"

function ListContextProvider({ children }) {
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState({});

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchActiveList();
      await fetchLists();
    }
  
    fetchInitialData();
  }, [])

  const fetchLists = async () => {
    try {
      const response = await axios.get(`${url}/lists`);
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
      await axios.put(`${url}/lists/${currentActiveListId}`, { active: false });
  
      // Update the selected list to set 'active' to true
      await axios.put(`${url}/${listId}`, { active: true });
  
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
      const response = await axios.get(`${url}/lists/active`);
      const activeList = response.data;

      // Fetch items for the active list
      const itemsResponse = await axios.get(`${url}/lists/${activeList.id}/items`);
      activeList.items = itemsResponse.data;

      setActiveList(activeList);
    } catch (error) {
      console.error('Error fetching active list:', error);
    }
  };

  const addItem = async (item) => {
    try {
      // Make API call to add a new item
      await axios.post(
        `${url}/lists/${activeList.id}/items`,
        item,
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

  const removeItem = async (itemId) => {
    try {
      // Make API call to delete an item
      await axios.delete(`${url}/lists/${activeList.id}/items/${itemId}`);
    } catch (error) {
      console.error('Error removing item:', error);
    }
    fetchActiveList();
  };

  const updateItemOptions = async (listId, itemId, item) => {
    try {
      console.log(item); // Add this line
      await axios.put(
        `${url}/lists/${listId}/items/${itemId}`,
        item,
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

  const saveList = async (name) => {
    try {
      const newList = { name };
      const response = await axios.post(
        `${url}/lists`,
        newList,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const savedList = response.data;
      setActiveList(savedList);
    } catch (error) {
      console.error('Error saving list:', error);
    }
  };

  const deleteList = async (listId) => {
    try {
      // Make API call to delete a list
      await axios.delete(`${url}/lists/${listId}`);
    } catch (error) {
      console.error('Error deleting list:', error);
    }
    fetchLists();
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
