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

const patchProduct = async (productId: number, product: any) => {
  const newProduct = { ...product, ...product.rating };
  delete newProduct.rating;
  delete newProduct.category;

  let categoryId;

  if (product.category) {
    const category = await Repositories.verifyCategory(product.category!);

    if (category.length === 0) {
      throw makeError({ message: "Categoria não existe", status: 400 });
    }

    categoryId = category[0].id;
  }

  await Repositories.updateProduct(
    {
      ...newProduct,
      category_id: product.category ? categoryId : undefined,
    },
    productId
  );

  const productFromDatabase = await Repositories.selectAProduct(productId);

  return productFromDatabase;
};

export default { createProduct, patchProduct };
