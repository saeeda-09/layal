const express = require('express');
const Waitlist = require('../models/waitlist.model.js');
const router = express.Router();
const { joinWaitlist, getWaitlist , getWaitingUsersByProduct } = require('../controllers/waitlist.controller.js');
const {get} = require('mongoose');
const { protect, admin } = require('../middlewares/auth.middleware.js');    

router.post('/', joinWaitlist); 
router.get('/product/:productId', protect, admin, getWaitingUsersByProduct);
router.get('/', protect, admin, getWaitlist);

module.exports = router;


