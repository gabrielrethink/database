import Repositories from "../repositories/Repositories";
import { makeError } from "../middlewares/errorHandler";

type ProductParams = {
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
  category?: string;
};

const createProduct = async (product: ProductParams) => {
  const newProduct = { ...product, ...product.rating };
  delete newProduct.rating;
  delete newProduct.category;

  const categoryId = await Repositories.verifyCategory(product.category!);

  if (categoryId.length === 0)
    throw makeError({ message: "Categoria não existe", status: 400 });

  const insertedProduct = await Repositories.insertProduct({
    ...newProduct,
    category_id: categoryId[0].id,
  });

  return insertedProduct;
};

export default { createProduct };
