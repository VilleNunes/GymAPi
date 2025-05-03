import { CredentialInvalid } from "@/services/error/invalid-credential-error";
import { makeAuthenticate } from "@/services/factory/makeAuthenticate";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticateController(req:FastifyRequest,res:FastifyReply){
    const schemaBody = z.object({
        email: z.string(),
        password: z.string()
    })
    const {email,password} = schemaBody.parse(req.body);
    try {
       
        const authenticateService = makeAuthenticate();

        await authenticateService.execute({
            email,
            password
        })

    } catch (error) {
        if(error instanceof CredentialInvalid){
            res.status(409).send({message: error.message});
            return
        }

        throw error
    }

    res.status(201).send();
    return;
}