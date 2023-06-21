import { Router } from "express";
import { router as productsRouter } from "./products";
import { router as authRouter } from "./auth";

const router: Router = Router();

router.use("/products", productsRouter);
router.use("/login", authRouter);

export { router };
