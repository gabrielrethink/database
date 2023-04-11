import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";

const knexInstance = knex(config);

type Book = {
  id?: number;
  name: string;
  author: string;
};

const index = async (req: Request, res: Response) => {
  try {
    const books: Book[] = await knexInstance("books").select("*");
    res.status(200).json(books);
  } catch (error) {
    res.send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await knexInstance("books").select("*").where({ id });
    if (!book.length) throw new Error("Esse livro não existe");

    res.status(200).json(book);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, author } = req.body;
    const updatedData: Book = { name, author };

    const book = await knexInstance("books").update(updatedData).where({ id });

    res.status(200).json(book);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await knexInstance("books").delete().where({ id });

    if (!book) throw new Error("Esse livro não existe");

    res.status(200).json({ msg: "Livro deletado" });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response) => {
  try {
    const { name, author } = req.body;

    const id: number[] = await knexInstance("books").insert({
      name,
      author,
    });

    res.status(201).json({ id: id[0], name, author });
  } catch (error) {
    res.send(error);
  }
};

export default { insert, index, show, update, remove };
