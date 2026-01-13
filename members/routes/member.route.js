const express = require("express");
const Member = require("../models/member.model.js")
const router = express.Router();
const {getMembers, getMember, createMember, updateMember,deleteMember, searchMembers} = require('../controllers/member.controller.js');
const { get } = require("mongoose");
const { protect, admin } = require("../middleware/auth.middleware.js");


router.get('/', protect, admin, getMembers);
router.get("/:id", protect, admin, getMember);
router.post('/', protect, admin, createMember);
router.put('/:id', protect, admin, updateMember);
router.delete('/:id', protect, admin, deleteMember);
router.get('/search', protect, admin, searchMembers);


module.exports = router;