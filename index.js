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


require('dotenv').config(); 

const CONNECTION_URI = process.env.MONGO_URI; 

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
