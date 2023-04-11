import { Router } from "express";
import booksController from "../controllers/booksController";

const router: Router = Router();

router.get("/", booksController.index);
router.get("/:id", booksController.show);
router.post("/", booksController.insert);
router.put("/:id", booksController.update);
router.delete("/:id", booksController.remove);

export { router };
