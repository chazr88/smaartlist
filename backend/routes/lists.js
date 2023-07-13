const express = require('express');
const listController = require('./listController');

const router = express.Router();

// Get all lists
router.get('/lists', listController.getAllLists);

// Get a specific list by index
router.get('/lists/:index', listController.getListByIndex);

// Create a new list
router.post('/lists', listController.createList);

// Update an existing list
router.put('/lists/:index', listController.updateList);

// Delete a list
router.delete('/lists/:index', listController.deleteList);

// Add an item to a list
router.post('/lists/:index/items', listController.addItemToList);

// Update an item in a list
router.put('/lists/:listIndex/items/:itemIndex', listController.updateItemInList);

// Delete an item from a list
router.delete('/lists/:listIndex/items/:itemIndex', listController.deleteItemFromList);

module.exports = router;
