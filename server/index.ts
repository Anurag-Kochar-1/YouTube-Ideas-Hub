import "dotenv/config";
import express, { Express, Request, Response } from "express";
const port = process.env.PORT || 8000;
import ApiRoutes from "./routes/api";
import { zodMiddleware } from "./middlewares/zod.middleware";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(zodMiddleware);
app.use("/api/v1", ApiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ data: 1 });
});

app.listen(port, () => {
  console.log(`🚗 now listening on port ${port}`);
});
