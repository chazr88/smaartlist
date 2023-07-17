const pool = require("../config/db");

const listController = {
  getAllLists: async (req, res) => {
    try {
      const client = await pool.connect();

      // Perform database query to get all lists
      const query = `
        SELECT * FROM my_schema.lists
      `;
      const result = await client.query(query);
      const lists = result.rows;

      client.release();

      // Send the response with the lists
      res.status(200).json(lists);
    } catch (error) {
      console.error("Error getting lists:", error);
      res.status(500).json({ message: "Error getting lists" });
    }
  },

  getListByIndex: (req, res) => {
    // Implementation to get a specific list by index
  },

  createList: async (req, res) => {
    try {
      const { id, name, items } = req.body;

      // Convert items array to JSON string
      const itemsJson = JSON.stringify(items);

      const client = await pool.connect();

      // Insert the new list into the database
      const query = `
          INSERT INTO my_schema.lists (id, name, items)
          VALUES ($1, $2, $3)
          RETURNING *
        `;
      const values = [String(id), name, itemsJson]; // Include the id in the values array
      const result = await client.query(query, values);

      client.release();

      const newList = result.rows[0];

      res.status(201).json(newList);
    } catch (error) {
      console.error("Error creating list:", error);
      res.status(500).json({ message: "Error creating list" });
    }
  },

  getActiveList: async (req, res) => {
    try {
      const client = await pool.connect();

      const query = `
        SELECT * FROM my_schema.lists WHERE active = true;
      `;
      const result = await client.query(query);
      const activeList = result.rows[0];

      client.release();

      if (!activeList) {
        return res.status(404).json({ message: "No active list found" });
      }

      res.status(200).json(activeList);
    } catch (error) {
      console.error("Error fetching active list:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateList: async (req, res) => {
    try {
      const { index } = req.params;
      const id = index;
      const { items, active } = req.body;
      console.log(items)
  
      const client = await pool.connect();
  
      // Find the list by id
      const selectQuery = `
        SELECT * FROM my_schema.lists
        WHERE id = $1
      `;
      const selectValues = [id];
      const selectResult = await client.query(selectQuery, selectValues);
      const list = selectResult.rows[0];
  
      if (!list) {
        client.release();
        return res.status(404).json({ message: "List not found" });
      }
  
      // Update the properties based on the available fields
      if (active !== undefined) {
        list.active = active;
      }
      if (items !== undefined) {
        list.items = JSON.stringify(items); 
      }
      
      // Update the list
      const updateQuery = `
        UPDATE my_schema.lists
        SET ${items !== undefined ? 'items = $1,' : ''}
            active = $${items !== undefined ? '2' : '1'}
        WHERE id = $${items !== undefined ? '3' : '2'}
        RETURNING *
      `;
      
      const updateValues = items !== undefined ? [list.items, list.active, id] : [list.active, id];
      
      const updateResult = await client.query(updateQuery, updateValues);
      const updatedList = updateResult.rows[0];
  
      client.release();
  
      // Return the updated list as the response
      res.status(200).json(updatedList);
    } catch (error) {
      console.error("Error updating list:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  

  deleteList: (req, res) => {
    // Implementation to delete a list
  },

  addItemToList: (req, res) => {
    // Implementation to add an item to a list
  },

  updateItemInList: async (req, res) => {
    try {
      const { listId, itemId } = req.params;
      const { item } = req.body;
  
      const client = await pool.connect();
  
      // Retrieve the entire items array
      const selectQuery = `
        SELECT items
        FROM my_schema.lists
        WHERE id = $1
      `;
      const selectValues = [listId];
      const selectResult = await client.query(selectQuery, selectValues);
      const itemsArray = selectResult.rows[0].items;
  
      // Find the index of the item with the matching id
      const itemIndex = itemsArray.findIndex((it) => it.id === itemId);
      if (itemIndex === -1) {
        client.release();
        return res.status(404).json({ message: "Item not found in the list" });
      }
  
      // Replace the item at the found index with the updated item
      itemsArray[itemIndex] = item;
  
      // Update the items array in the database
      const updateQuery = `
        UPDATE my_schema.lists
        SET items = $1
        WHERE id = $2
        RETURNING *
      `;
      const updateValues = [itemsArray, listId];
      const updateResult = await client.query(updateQuery, updateValues);
      const updatedList = updateResult.rows[0];
  
      client.release();
  
      // Return the updated list as the response
      res.status(200).json(updatedList);
    } catch (error) {
      console.error("Error updating item in list:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  


  deleteItemFromList: (req, res) => {
    // Implementation to delete an item from a list
  },
};

module.exports = listController;
