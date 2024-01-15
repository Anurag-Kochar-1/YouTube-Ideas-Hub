import "dotenv/config";
import express, { Express, Request, Response, Router } from "express";
import cors from "cors";
import ApiRoutes from "./routes/api";
import { zodMiddleware } from "./middlewares/zod.middleware";
import bodyParser from "body-parser";
const baseUrl = process.env.AUTH0_BASE_URL;
const port = process.env.PORT || 8000;
const app: Express = express();
import { check0AuthJwt } from "./middlewares/auth0-authenticate.middleware";
import axios from "axios";

app.use(cors({ origin: baseUrl }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(zodMiddleware);

app.use("/api/v1", ApiRoutes);

app.use(check0AuthJwt)

app.get(`/api/v1/test`, async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]
  const response = await axios.get(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log(response.data)

  res.json(response.data);
});

app.listen(port, () => {
  console.log(`🚗 now listening on port ${port}`);
});
