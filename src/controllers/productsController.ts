import { NextFunction, Request, Response } from "express";
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

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = req.body;
    const productId = Number(req.params.id);
    const updatedProduct = await productService.patchProduct(
      productId,
      product
    );

    res.status(200).json(updatedProduct);
  } catch (error: unknown) {
    next(error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = req.body;
    const newProduct = await productService.createProduct(product);

    res.status(200).json(newProduct);
  } catch (error: unknown) {
    next(error);
  }
};

export default { index, update, insert };
