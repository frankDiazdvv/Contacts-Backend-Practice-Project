const express = require('express');
const router = express.Router();
const { getContact, createContact, getContactbyId, updateContact, deleteContact } = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandle');

router.use(validateToken);

// Get all contacts - GET         //Create a Contact - POST  
router.route("/").get(getContact).post(createContact);

//Get Contact by ID - GET   //Update Contact by ID - PUT //Delete Contact by ID - DELETE
router.route("/:id").get(getContactbyId).put(updateContact).delete(deleteContact);


module.exports = router;