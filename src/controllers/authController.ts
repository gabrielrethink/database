import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";

const newUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: { login: string; password: string } = req.body;
    authService.newUserFromService(user);
    res.status(200).json({ msg: "usuario criado com sucesso" });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: { login: string; password: string } = req.body;
    const token = await authService.loginUser(user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default { newUser, login };
