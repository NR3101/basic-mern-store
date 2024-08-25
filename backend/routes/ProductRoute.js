import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/ProductControllers.js";

const router = express.Router();

// get request to get all products
router.get("/", getProducts);

// post request to create a new product
router.post("/", createProduct);

// put request to update a product
router.put("/:id", updateProduct);

// delete request to delete a product
router.delete("/:id", deleteProduct);

export default router;
