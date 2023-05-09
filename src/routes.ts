import { Router } from "express";

import PostController from "./controllers/PostController";

const routes = Router();

routes.get("/posts", PostController.getAllPosts);
routes.get("/posts/:id", PostController.getPostById);
routes.post("/posts", PostController.createPost);
routes.patch("/posts/:id", PostController.updatePost);
routes.delete("/posts/:id", PostController.deletePost);

export default routes;
