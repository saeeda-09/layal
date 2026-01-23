const express = require('express');
const User = require('../models/user.model.js');
const router = express.Router();


// Destructure the functions from the new user controller
const { 
    getProfile,
    getUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/user.controller.js'); 
const {protect, admin } = require('../middlewares/auth.middleware.js');

router.route('/').get(protect, admin, getUsers);
router.get('/profile', protect, getProfile);
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);
//router.get('/profile', protect, (req, res) => res.json(req.user));

module.exports = router;