import express from "express"
import mongoose from 'mongoose';
import router from "./routes/cart.route.js"
import router from "./routes/order.route.js"

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/carts', router);
app.use('/api/orders', router);

app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
});



mongoose.connect("mongodb+srv://backenddb:backenddb@backenddb.5p3w75r.mongodb.net/?appName=BackendDB")
.then(() => {
    console.log("Connected to the database!");
    app.listen(3000, () => console.log("Server running on port 3000"));
}) 
.catch(() => {
    console.log("Connection failed!");
});