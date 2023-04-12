import { Router } from "express";
import authorsController from "../controllers/authorsController";

const router: Router = Router();

router.get("/", authorsController.index);
router.get("/:id", authorsController.show);
router.post("/", authorsController.insert);
router.put("/:id", authorsController.update);
router.delete("/:id", authorsController.remove);

export { router };
