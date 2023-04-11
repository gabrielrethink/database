import express, { Response, Request } from "express";
import { router } from "./routes";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API V1 is running");
});

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
