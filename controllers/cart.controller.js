import Cart from "../models/cart.model.js"
import Product from "../models/product.model.js"
import { z } from "zod";

const cartValidator = z.object({
        items: z.array(z.object({
                productId: z.string(),
                quantity: z.number().int().positive(),
        })),
});

// export const getCarts = async(req, res) => {
//     try {
//             const carts = await Cart.find({ userId: req.user.id });
//             res.status(200).json(carts);    
//     } catch (error) {
//             res.status(500).json({message: error.message});
//     }
// }

export const getCart = async (req, res) => {
        try {
                const {id} = req.params;
                const cart = await Cart.findOne({
                        _id: id,
                        userId: req.user.id
                });

                if(!cart){
                        return res.status(404).json({ message:"Cart not found"});
                }

                res.status(200).json(cart);
        } catch (error) {
                    res.status(500).json({message: error.message});
        }
}

export const createCart = async (req, res) => {
        try {
                const parsed = cartValidator.parse(req.body);
                
                for(const item of parsed.items){
                        const product = await Product.findById(item.productId);

                        if(!product){
                                return res.status(404).json({message: `${item.productId} not found`});
                        }

                        if(item.quantity > product.stock){
                                return res.status(400).json({message: `Insuffienct stock`});
                        }
                }

                const cart = await Cart.create({
                        userId: req.user.id,
                        items: parsed.items
                });

                res.status(201).json(cart);
        } catch (error) {
                if(error instanceof z.ZodError){
                        return res.status(400),json({message: error.errors});
                }
                res.status(500).json({message: error.message})
        }
}

export const updateCart = async (req, res) => {
        try {
                const {id} = req.params;

                const parsed = cartValidator.parse(req.body);
        
                const cart = await Cart.findByIdAndUpdate(
                        {_id: id, userId: req.user.id},
                        {items: parsed.items},
                        {new: true}
        );
    
        if(!cart){
                return res.status(404).json({message: "Cart not found"});
        }
    
        res.status(200).json(updatedCart);
    
    } catch (error) {
        if(error instanceof z.ZodError){
                return res.status(400).json({message: error.errors});
        }
        res.status(500).json({message: error.message});
    }
}

export const deleteCart = async (req, res) => {
        try {
                const {id} = req.params;
    
                const cart = await Cart.findByIdAndDelete({
                        _id: id,
                        userId: req.user.id
                });
    
        if(!cart) {
                return res.status(404).json({message: "Cart not found"});
        }
    
                res.status(200).json({message: "Cart product deleted successfully."});
        } catch (error) {
                res.status(500).json({message: error.message});
        }
}
