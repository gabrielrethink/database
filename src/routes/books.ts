import { Router, Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";

const knexInstance = knex(config);

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, author } = req.body;

  const id: number[] = await knexInstance("books").insert({
    name,
    author,
  });

  res.status(201).json({ insert: id });
});

export { router };
