import knex from "knex";
import knexConfig from "../../knexfile";

const knexInstance = knex(knexConfig);

const insert = async (user: { login: string; password: string }) =>
  await knexInstance.insert(user).into("users");

const getUser: (login: { [key: string]: string | number }) => Promise<{
  login: string;
  password: string;
  id: number;
}> = async (where) => {
  const user = await knexInstance.select("*").from("users").where(where);

  return user[0];
};

export default { insert, getUser };
