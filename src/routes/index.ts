import { router as booksRoutes } from "./books";
import { Router } from "express";

const router: Router = Router();

router.use("/books", booksRoutes);

export { router };
