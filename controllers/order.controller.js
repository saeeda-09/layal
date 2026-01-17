import Order from "../models/order.model.js"
import Cart from "../models/cart.model.js"
import { z } from "zod";

const orderValidator = z.object({
   paymentMethod: z.string()
});

export const getOrders = async(req, res) => {
        try {
                const {page = 1, limit = 10} = req.query;
                const filter = req.user.role === "admin"
                        ? {}
                        : { userId: req.user.id };

                const orders = await Order.find(filter)
                .skip((page - 1) * limit)
                .limit(Number(limit));
                
                res.status(200).json(orders);    
        } catch (error) {
                res.status(500).json({message: error.message});
        }
};

export const getOrder = async (req, res) => {
        try {
                const {id} = req.params;
                const order = await Order.findOne({
                        _id: id,
                        userId: req.user.id
                });

                if(!order){
                        return res.status(404).json({message: "Order not found"});
                }

                res.status(200).json(order);
        } catch (error) {
                res.status(500).json({message: error.message});
        }   
};

export const createOrder = async (req, res) => {
        try {
                const parsed = orderValidator.parse(req.body);

                const cart = await Cart.findOne({userId: req.user.id});

                if(!cart || cart.items.length === 0){
                        return res.status(400).json({message: "Cart is empty"});
                }

                let totalamount = 0;

                const items = [];

                for (const item of cart.items) {
                        const product = await Product.findById(item.productId);

                        if (!product) {
                                return res.status(404).json({ message: "Product not found" });
                        }

                        totalamount += item.quantity * product.price;

                        items.push({
                        productId: product._id,
                        quantity: item.quantity,
                        price: product.price,
                        name: product.name
                        });
                }

                const order = await Order.create({
                        userId: req.user.id,
                        items,
                        totalamount,
                        paymentMethod: parsed.paymentMethod
                });

                cart.items = [];
                await cart.save();

                res.status(200).json(order);
        } catch (error) {
                if(error instanceof z.ZodError){
                        return res.status(400).json({message: error.errors});
                }
                res.status(500).json({message: error.message});
        }
};

export const updateOrder = async (req, res) => {
        try {
                const {id} = req.params;
        
                const order = await Order.findByIdAndUpdate(id, req.body, {new:true});
        
                if(!order){
                        return res.status(404).json({message: "Order not found"});
                }

                res.status(200).json(order);
        
        } catch (error) {
                res.status(500).json({message: error.message});
        }
};

export const deleteOrder = async (req, res) => {
        try {
                const {id} = req.params;
        
                const order = await Order.findByIdAndDelete({
                        _id: id,
                        userId: req.user.id
                });
        
                if(!order) {
                        return res.status(404).json({message: "Order not found"});
                }
        
                res.status(200).json({message: "Order deleted successfully."});
        } catch (error) {
                res.status(500).json({message: error.message});
        }
};