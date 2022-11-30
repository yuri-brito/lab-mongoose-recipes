import express from "express";
import * as dotenv from "dotenv";
import dbConnect from "./config/db.config.js";
import recipeRouter from "./routes/recipe.routes.js";
dotenv.config();
dbConnect();
const app = express();
app.use(express.json());
app.use("/recipe", recipeRouter);
app.listen(Number(process.env.PORT), () => {
  console.log(`server up and running on port ${process.env.PORT}`);
});
