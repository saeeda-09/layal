const                    
   Product = require('../models/product.model');
const { z } = require('zod');

const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.number().nonnegative("Price must be a non-negative number"),
    quantity: z.number().int().nonnegative("Quantity must be a non-negative integer"),
    description: z.string().optional(),
    category: z.string().optional(),
    image: z.string().optional()
});

const getProducts = async (req, res) => {
    const {
        search,
        category,
        minRating,
        maxRating,
        sort = "latest",
        page = 1,
        limit = 5
    } = req.query;
    const query = {};
    if (search) {
        query.title = { $regex: search, $options: "i" };
    }
    if (category) {
        query.category = category;
    }
    if (minRating || maxRating) {
        query.rating = {};
        if (minRating) query.rating.$gte = Number(minRating);
        if (maxRating) query.rating.$lte = Number(maxRating);
    }
    let sortOption = {};
    if (sort === "rating_high") sortOption = { rating: -1 };
    else if (sort === "rating_low") sortOption = { rating: 1 };
    else if (sort === "title_asc") sortOption = { title: 1 };
    else if (sort === "title_desc") sortOption = { title: -1 };
    else sortOption = { createdAt: -1 };

    const skip = (page - 1) * limit;

    const products = await Product.countDocuments(query);

    res.json({
        total: products,
        page: Number(page),
        page: Math.ceil(total / limit),
        products
    });
}   ;

    /*try {
        const products = await Product.find({});
        res.status(200).json(products);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};*/

const getProduct = async (req, res) => {
try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    }catch (error) {
        res.status(500).json({message: error.message});
    }    
};

const createProduct = async(req,res) =>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id,req.body);

        if(!updatedProduct)
        {
            return res.status(404).json({message:"Product not found!"});
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

const deleteProduct = async (req, res) => {
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
module.exports = {
    getProducts, 
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
