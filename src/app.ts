import fastify from "fastify";
import { routes } from "./http/route";

const app = fastify()

app.register(routes);

export{
    app
}