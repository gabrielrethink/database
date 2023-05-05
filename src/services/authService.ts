import bcrypt from "bcrypt";
import AuthRepositories from "../repositories/AuthRepositories";
import { makeError } from "../middlewares/errorHandler";
import jwt from "jsonwebtoken";

const newUserFromService = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const hash = await bcrypt.hash(password, Number(process.env.SALT!));
  return AuthRepositories.insert({ login, password: hash });
};

const loginUser = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const userFromDatabase = await AuthRepositories.getUser({ login });
  const verify = await bcrypt.compare(password, userFromDatabase.password);

  if (!verify) throw makeError({ message: "erro de login", status: 500 });

  return jwt.sign(
    {
      userId: userFromDatabase.id,
    },
    process.env.SECRET_TOKEN!,
    { expiresIn: "7 days" }
  );
};

export default { newUserFromService, loginUser };
