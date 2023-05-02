import knex from "knex";
import knexConfig from "../../knexfile";

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

export default { verifyCategory, insertProduct };
