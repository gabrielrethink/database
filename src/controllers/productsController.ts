import { Request, Response } from "express";
import knex from "knex";
import knexFile from "../../knexfile";

import productService from "../services/productService";

const knexInstance = knex(knexFile);
const index = async (req: Request, res: Response) => {
  try {
    const products = await knexInstance("products")
      .select(
        "*",
        "categories.name as category",
        "categories.id as category_id",
        "products.id as id"
      )
      .join("categories", "categories.id", "=", "products.category_id");

    const formatedProducts = products.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {
        rate: product.rate,
        count: product.count,
      },
    }));

    res.send(formatedProducts);
  } catch (error: any) {
    res.send(error.message);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const updatedProduct = req.body;

    if (updatedProduct.category) {
      const category = await knexInstance("categories")
        .select("*")
        .where({ name: updatedProduct.category });
      if (category[0].id) {
        updatedProduct.category_id = category[0].id;
      }
    }

    delete updatedProduct.category;

    await knexInstance("products")
      .update(updatedProduct)
      .where({ id: req.params.id });

    res.send({ msg: "productUpdated" });
  } catch (error: any) {
    console.log(error.message);
  }
};

const insert = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const newProduct = await productService.createProduct(product);
    res.status(200).json({ id: newProduct[0], ...product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default { index, update, insert };
