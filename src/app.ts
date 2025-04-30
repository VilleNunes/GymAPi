import fastify from "fastify";
import { routes } from "./http/route";
import { ZodError } from "zod";
import { env } from "./env";

const app = fastify()

app.register(routes);

app.setErrorHandler((error,req,res)=>{
    if(error instanceof ZodError){
        return res.status(400).send({
            message: "bad request",
            issue: error.format()
        })
    }
    if(env.NODE_ENV == "dev"){
        console.log(error);
    }
    return res.status(500).send({message:"Internal server error"})
});

export{
    app
}