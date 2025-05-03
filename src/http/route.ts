import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register.controller";
import { authenticateController } from "./controllers/authenticate.controller";

export async function routes(app:FastifyInstance){
    app.post("/register",registerController)
    app.post("/session",authenticateController);
}