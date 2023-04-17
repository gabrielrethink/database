import { Router } from "express";
import { router as productsRouter } from "./products";

const router: Router = Router();

router.use("/products", productsRouter);

export { router };
