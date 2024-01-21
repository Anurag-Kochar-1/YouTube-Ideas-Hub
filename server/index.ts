import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import ApiRoutes from "./routes/api";
import { zodMiddleware } from "./middlewares/zod.middleware";
import bodyParser from "body-parser";
const baseUrl = process.env.AUTH0_BASE_URL;
const port = process.env.PORT || 8000;
const app: Express = express();
import { check0AuthJwt } from "./middlewares/auth0-authenticate.middleware";
import { addAuth0User } from "./middlewares/add-auth0-user.middleware";

app.use(cors({ origin: baseUrl }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(zodMiddleware);
app.use(check0AuthJwt);

app.use("/api/v1", ApiRoutes);
app.get(`/api/v1/test`, (req: any, res: any) => {
  res.json({result: "test passed ✅"})
});

app.listen(port, () => {
  console.log(`🚗 now listening on port ${port}`);
});

export default app