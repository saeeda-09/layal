const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require("./routes/product.route.js");
const User = require('./models/user.model.js');
const userRoute = require('./routes/user.route.js');
const app = express()

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routes
app.use('/api/products',productRoute);
app.use('/api/users', userRoute);


app.get('/',(req,res) => {
    res.send("hello from node api");
}); 

/* app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
});


app.get('/api/products/:id', async (req,res) => {
   
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    }catch (error) {
        res.status(500).json({message: error.message});
    }
    
});


app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
});


//update a product
app.put('/api/products/:id', async (req, res) => {
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
});

    //delete
    app.delete('/api/products/:id', async (req, res) => {
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
    });*/

/*mongoose.connect()
.then(() =>{
    console.log("connected to database!");
    app.listen(3000,() => {
    console.log("server is running on port 3000");
    });
})
.catch(() => {
    console.log("connection failed!");
});*/
// index.js
// 1. Load environment variables from .env file
require('dotenv').config(); 
// ... other imports

// 2. Access the variable securely
const CONNECTION_URI = process.env.MONGO_URI; 

// 3. Use the variable in the connect function
mongoose.connect(CONNECTION_URI) 
.then(() => {
    console.log("connected to database!");
    app.listen(3000,() => {
    console.log("server is running on port 3000");
    });
})
.catch(() => { 
    console.log("connection failed!");
});