import { Router } from "express";
import categoriesController from "../controllers/categoriesController";

const categories: Router = Router();
const category: Router = Router();
categories.get("/", categoriesController.index);
category.get("/:category", categoriesController.show);

export { categories, category };
