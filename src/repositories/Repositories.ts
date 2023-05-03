import knex from "knex";
import knexConfig from "../../knexfile";
import { makeError } from "../middlewares/errorHandler";

const knexInstance = knex(knexConfig);

type Product = {
  title: string;
  price: number;
  description: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
  rate?: number;
  count?: number;
  category_id: number;
};

const verifyCategory = (category: string) =>
  knexInstance("categories").select("id").where({ name: category });

const insertProduct = (product: Product) =>
  knexInstance.insert(product).into("products");

const updateProduct = (product: any, id: number) =>
  knexInstance("products").where({ id }).update(product);

const selectAProduct = async (id: number) => {
  const product = await knexInstance("products")
    .select(
      "*",
      "categories.name as category",
      "categories.id as category_id",
      "products.id as id"
    )
    .join("categories", "categories.id", "=", "products.category_id")
    .where({ "products.id": id });

  // if (product.length > 1) {
  //   throw makeError({ message: "Id deve ser uma primary key", status: 500 });
  // }

  delete product[0].category_id;
  const rating = { rate: product[0].rate, count: product[0].count };
  delete product[0].rate;
  delete product[0].count;

  return { ...product[0], rating };
};

export default { verifyCategory, insertProduct, updateProduct, selectAProduct };
