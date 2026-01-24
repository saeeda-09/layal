import Wishlist from "../models/wishlist.model.js";
import Product from "../models/product.model.js";

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const wishlistItem = await Wishlist.create({
      userId: req.user.id,
      productId
    });

    res.status(201).json(wishlistItem);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Product already in wishlist"
      });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getMyWishlist = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const match = { userId: req.user.id };

    const wishlist = await Wishlist.find(match)
      .populate({
        path: "productId",
        match: search
          ? { name: { $regex: search, $options: "i" } }
          : {},
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const filtered = wishlist.filter(item => item.productId !== null);

    const total = await Wishlist.countDocuments(match);

    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      total,
      wishlist: filtered
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const removed = await Wishlist.findOneAndDelete({
      _id: id,
      userId: req.user.id
    });

    if (!removed) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    res.status(200).json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};