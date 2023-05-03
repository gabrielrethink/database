import { NextFunction, Request, Response } from "express";
import { object, string, number } from "yup";

const productPathValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = req.params;
    const productData = req.body;

    const paramsSchema = object({
      id: string().required("Id é obrigatório"),
    });

    const productSchema = object({
      title: string(),
      price: number(),
      description: string(),
      category: string(),
      image: string(),
      rating: object({
        rate: number(),
        count: number(),
      }),
    });

    await productSchema.validate(productData);
    await paramsSchema.validate(paramsData);

    next();
  } catch (error) {
    next(error);
  }
};
const productDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;

    const productSchema = object({
      title: string().required(),
      price: number().required(),
      description: string().required(),
      category: string().required("Categoria é obrigatorio"),
      image: string().required(),
      rating: object({
        rate: number().required(),
        count: number().required(),
      }),
    });

    await productSchema.validate(productData);

    next();
  } catch (error) {
    next(error);
  }
};

export default { productDataValidator, idParamsValidor: productPathValidator };
