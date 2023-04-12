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
    const books: Book[] = await knexInstance("books")
      .select("books.name", "authors.name as author")
      .join("authors", "authors.id", "=", "books.author_id");

    res.status(200).json(books);
  } catch (error) {
    res.send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book: Book[] = await knexInstance("books")
      .select("books.name", "authors.name as author")
      .join("authors", "authors.id", "=", "books.author_id")
      .where({ "books.id": id });

    if (!book.length) throw new Error("Esse livro não existe");

    res.status(200).json(book[0]);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response) => {
  try {
    const { name, author } = req.body;

    const findAuthor = await knexInstance("authors")
      .select("id")
      .where({ name: author });

    const authorId = findAuthor[0].id;

    const id: number[] = await knexInstance("books").insert({
      name,
      author_id: authorId,
    });

    res.status(201).json({ id: id[0], name, author });
  } catch (error) {
    res.send(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, author } = req.body;
    const updateData: any = { name };
    if (author) {
      const authorData = await knexInstance("authors")
        .select("id")
        .where({ name: author });

      if (!authorData[0]) {
        throw new Error("Autor não existe");
      }
      updateData.author_id = authorData[0].id;
    }

    await knexInstance("books").update(updateData).where({ id });

    res.status(200).json({ name, author });
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

export default { insert, index, show, update, remove };
