import { Router } from "express";
import authController from "../controllers/authController";

const router: Router = Router();

router.post("/newUser", authController.newUser);
router.post("/", authController.login);

export { router };
