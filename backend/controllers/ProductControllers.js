import Product from "../models/ProductModel.js";
import mongoose from "mongoose";
import { z } from "zod";

// get all products from the database
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// validate the request body using zod before creating a new product
const createproductSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" }),
  price: z
    .string()
    .min(1, { message: "Price must be at least 1 character long" }),
  image: z
    .string()
    .min(10, {
      message: "Image URL must be at least 10 characters long",
    })
    .url({
      message: "Image must be a valid URL",
    }),
});

// create a new product
export const createProduct = async (req, res) => {
  // Validate the request body using zod
  const product = createproductSchema.safeParse(req.body);

  if (!product.success) {
    return res.status(400).json({
      success: false,
      message: product.error.errors.map((error) => error.message),
    });
  }

  try {
    // Save the product to the database
    const newProduct = await Product.create(product.data);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// validate the update request body using zod before updating the product
const updateProductSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .optional(),
  price: z
    .string()
    .min(1, { message: "Price must be at least 1 character long" })
    .or(z.number().min(0, { message: "Price must be a positive number" }))
    .optional(),
  image: z
    .string()
    .min(10, { message: "Image URL must be at least 10 characters long" })
    .url({ message: "Image must be a valid URL" })
    .optional(),
});

// update a product
export const updateProduct = async (req, res) => {
  // Validate the request body using zod
  const product = updateProductSchema.safeParse(req.body);

  // If the request body is invalid, return a 400 response
  if (!product.success) {
    return res.status(400).json({
      success: false,
      message: product.error.errors.map((error) => error.message),
    });
  }

  const { id } = req.params; // Get the product ID from the URL

  // Validate the product ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  try {
    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(id, product.data, {
      new: true, // this will return the updated product
    });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params; // Get the product ID from the URL

  // Validate the product ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  try {
    await Product.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
