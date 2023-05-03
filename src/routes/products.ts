import { Router } from "express";
import { categories, category } from "./categories";
import productsController from "../controllers/productsController";
import middleware from "../middlewares/dataValidator";

const router: Router = Router();

router.use("/categories", categories);
router.use("/category", category);
router.get("/", productsController.index);
router.post("/", middleware.productDataValidator, productsController.insert);
router.patch("/:id", middleware.idParamsValidor, productsController.update);

export { router };
