import { Request, Response } from "express";
import knex from "knex";
import knexFile from "../../knexfile";

const knexInstance = knex(knexFile);
const index = async (req: Request, res: Response) => {
  try {
    const categories = await knexInstance("categories").select("*");
    const formatedCategories = categories.map((category) => category.name);

    res.send(formatedCategories);
  } catch (error: any) {
    res.send(error.message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const products = await knexInstance("products")
      .select(
        "*",
        "categories.name as category",
        "categories.id as category_id",
        "products.id as id"
      )
      .join("categories", "categories.id", "=", "products.category_id")
      .where({ category });

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

export default { index, show };
