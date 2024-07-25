import { Router } from "express";
import productsRouter from "@modules/products/routes/products.routes";
import usersRouter from "@modules/users/users.routes";

const routes = Router();

routes.use("/products", productsRouter);

routes.use("/users", usersRouter);

routes.get("/", (request, response) => {
  return response.json({ message: "Hello!" });
});

export default routes;
