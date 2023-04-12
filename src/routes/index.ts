import { router as booksRoutes } from "./books";
import { router as authorsRoutes } from "./authors";
import { Router } from "express";

const router: Router = Router();

router.use("/books", booksRoutes);
router.use("/authors", authorsRoutes);

export { router };
