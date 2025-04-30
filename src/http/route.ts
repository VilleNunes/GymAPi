import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register.controller";

export async function routes(app:FastifyInstance){
    app.post("/register",registerController)
}