import { errorHandler } from "./middlewares/errorHandler";
import express, { Response, Request } from "express";
import { router } from "./routes";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Fake store rest API for your e-commerce or shopping website prototype"
  );
});

app.use("/", router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
