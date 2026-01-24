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

const notifyWaitlistUsers = async (productId) => {
    try {
        const result = await Waitlist.updateMany(
            { productId, status: 'waiting' },
            { $set: { status: 'notified' } }
        );
        
        console.log(`Updated ${result.modifiedCount} users to notified status.`);
    } catch (error) {
        console.error(`Error notifying users for product ${productId}:`, error);
    }
};

/*const notifyWaitlistUsers = async (productId) => {
    try {
        const waitingUsers = await Waitlist.find({ productId, status: 'waiting' });

        for (const user of waitingUsers) {
            console.log(`Notifying ${user.email} about product ${productId} availability.`);
            user.status = 'notified';
            await user.save();
        }
    } catch (error) {
        console.error(`Error notifying waitlist users for product ${productId}:`, error);
    }

};*/

module.exports = { joinWaitlist, getWaitlist , getWaitingUsersByProduct, notifyWaitlistUsers};