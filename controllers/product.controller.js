import Product from "../models/product.model.js"


export const getProducts = async (req, res) => {
    try {
        const {page = 1, limit = 10, search} = req.query;

        const query = search
        ? {name: {$regex: search, $options: "i"}}
        : {};

        const products = await Product.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));

        const total = await Product.countDocuments(query);
        
        res.status(200).json({
            page: Number(page),
            limit: Number(limit),
            total, 
            products
        });
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getProduct = async (req, res) => {
try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    }catch (error) {
        res.status(500).json({message: error.message});
    }    
};

export const createProduct = async(req,res) =>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id,req.body);

        if(!updatedProduct)
        {
            return res.status(404).json({message:"Product not found!"});
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

export const deleteProduct = async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product)
        {
            return res.status(404).json({message:"product not found!"});
        }
        res.status(200).json({nessage:"Product Deleted Successfully!"});
    }catch (error){
        res.status(500).json({message:error.message});
    }
};