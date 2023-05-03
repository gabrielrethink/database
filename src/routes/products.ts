import { NextFunction, Router } from "express";
import { categories, category } from "./categories";
import productsController from "../controllers/productsController";

import { Request, Response } from "express";

const router: Router = Router();

router.use("/categories", categories);
router.use("/category", category);
router.get("/", productsController.index);
router.post("/", productsController.insert);
router.put("/:id", productsController.update);

export { router };
