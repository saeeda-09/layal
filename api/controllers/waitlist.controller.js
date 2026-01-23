const Waitlist = require('../models/waitlist.model.js');


const joinWaitlist = async (req, res) => {
    try {
        const { email, productId } = req.body;
        const entry = await Waitlist.create({ email, productId });
        res.status(201).json({ success: true, message: "Added to waitlist!", data: entry });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "This email is already on the waitlist." });
        }
        res.status(500).json({ message: error.message });
    }
};

const getWaitingUsersByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const waitingList = await Waitlist.find({ productId, status: 'waiting' });
        res.status(200).json(waitingList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getWaitlist = async (req, res) => {
    try {
        const members = await Waitlist.find({}).sort({ createdAt: -1 });
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { joinWaitlist, getWaitlist , getWaitingUsersByProduct};