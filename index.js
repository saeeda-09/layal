import express from "express"
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userrouter from "./routes/user.route.js"
import prodrouter from "./routes/product.route.js"
import cartrouter from "./routes/cart.route.js"
import orderrouter from "./routes/order.route.js"

dotenv.config()

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/users', userrouter);
app.use('/api/products', prodrouter);
app.use('/api/carts', cartrouter);
app.use('/api/orders', orderrouter);

app.get('/', (req, res) => {
    res.send("Hello from Fake Cake server");
});



mongoose.connect(process.env.MONGO_ME)
.then(() => {
    console.log("Connected to the database!");
}) 
.catch(() => {
    console.log("Connection failed!");
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))   ;