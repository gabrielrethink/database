import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";

const knexInstance = knex(config);

type Author = {
  id?: number;
  name: string;
  bestSeller?: string;
};

const index = async (req: Request, res: Response) => {
  try {
    const authors: Author[] = await knexInstance("authors").select("*");
    res.status(200).json(authors);
  } catch (error) {
    res.send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const author = await knexInstance("authors").select("*").where({ id });
    if (!author.length) throw new Error("Esse autor não existe");

    res.status(200).json(author);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response) => {
  try {
    const { name, bestSeller } = req.body;

    const id: number[] = await knexInstance("authors").insert({
      name,
      bestSeller,
    });

    res.status(201).json({ id: id[0], name, bestSeller });
  } catch (error: any) {
    res.send(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, bestSeller } = req.body;
    const updatedData: Author = { name, bestSeller };

    const book = await knexInstance("authors")
      .update(updatedData)
      .where({ id });

    res.status(200).json(book);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await knexInstance("authors").delete().where({ id });

    if (!book) throw new Error("Esse livro não existe");

    res.status(200).json({ msg: "Livro deletado" });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { insert, index, show, update, remove };
