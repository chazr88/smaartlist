const express = require('express');
const listController = require('../controllers/listController');

const router = express.Router();

//Get last list created
router.get('/active', listController.getActiveList);

// Get all lists
router.get('/', listController.getAllLists);

// Get a specific list by index
router.get('/:index', listController.getListByIndex);

// Create a new list
router.post('/', listController.createList);

// Update an existing list
router.put('/:index', listController.updateList);

// Delete a list
router.delete('/:index', listController.deleteList);

// Add an item to a list
router.post('/:index/items', listController.addItemToList);

// Update an item in a list
router.put('/:listIndex/items/:itemIndex', listController.updateItemInList);

// Delete an item from a list
router.delete('/:listIndex/items/:itemIndex', listController.deleteItemFromList);



module.exports = router;
