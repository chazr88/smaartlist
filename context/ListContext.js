import React, { createContext, useState } from 'react';
import axios from 'axios';

const ListContext = createContext();

const initialListData = [
  {
    name: 'Daily List',
    items: [
      { name: 'Apples', amount: '1', measurement: 'pound(s)' },
      { name: 'Bananas', amount: '1', measurement: 'pound(s)' },
      { name: 'Bread', amount: '2', measurement: 'Bag(s)' },
    ],
  },
];

function ListContextProvider({ children }) {
  const [lists, setLists] = useState(initialListData);
  const [activeListIndex, setActiveListIndex] = useState(0);

  const addItem = (item) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      const activeList = updatedLists[activeListIndex];
      activeList.items = [...activeList.items, item];
      return updatedLists;
    });
  };

  const removeItem = (index) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      const activeList = updatedLists[activeListIndex];
      activeList.items.splice(index, 1);
      return updatedLists;
    });
  };

  const updateItemOptions = (itemIndex, amount, measurement) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      const activeList = updatedLists[activeListIndex];
      const updatedItems = [...activeList.items];
      updatedItems[itemIndex] = { ...updatedItems[itemIndex], amount, measurement };
      activeList.items = updatedItems;
      return updatedLists;
    });
  };

const addList = (name, items) => {
  setLists((prevLists) => {
    const newList = { name, items: [...items] };
    const updatedLists = [...prevLists, newList];
    const newIndex = updatedLists.length - 1;
    setActiveListIndex(newIndex);
    return updatedLists;
  });
};

  const deleteList = (index) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      updatedLists.splice(index, 1);
      return updatedLists;
    });
  };

  const setActiveList = (index) => {
    setActiveListIndex(index);
  };

  return (
    <ListContext.Provider
      value={{
        lists,
        activeListIndex,
        addItem,
        removeItem,
        updateItemOptions,
        addList,
        deleteList,
        setActiveList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

export default ListContextProvider;
export { ListContext };
