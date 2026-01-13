const                    
   Member = require('../models/member.model');
const { z } = require('zod');

const productSchema = z.object({
    name: z.string().min(1, "Member name is required"),
    description: z.string().optional(),
    category: z.string().optional(),
    image: z.string().optional()
});

const getMembers = async (req, res) => {
    try {
        const members = await Member.find({});
        res.status(200).json(members);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getMember = async (req, res) => {
try {
        const { id } = req.params;
        const member = await Member.findById(id);
        res.status(200).json(member);

    }catch (error) {
        res.status(500).json({message: error.message});
    }    
};

const createMember = async(req,res) =>{
    try {
        const member = await Member.create(req.body);
        res.status(200).json(member);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateMember = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedMember = await Member.findByIdAndUpdate(id,req.body);

        if(!updatedMember)
        {
            return res.status(404).json({message:"Member not found!"});
        }
        const updateMember = await Member.findById(id);
        res.status(200).json(updateMember);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

const deleteMember = async (req, res) => {
    try{
            const { id } = req.params;
            const member = await Member.findByIdAndDelete(id);

            if(!member)
            {
                return res.status(404).json({message:"Member not found!"});
            }
            res.status(200).json({message:"Member Deleted Successfully!"});
        }catch (error){
            res.status(500).json({message:error.message});
        }
    };
    const searchMembers = async (req, res) => {
    try {
        const { name, type } = req.query; // Get from URL like ?name=John&type=premium
        let query = {};

        if (name) query.name = { $regex: name, $options: 'i' }; // Partial match, case-insensitive
        if (type) query.type = type;

        const members = await Member.find(query).select('name type'); // Only return name and type
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getMembers, 
    getMember,
    createMember,
    updateMember,
    deleteMember,
    searchMembers
};