import { PrismaUsersRepository } from "@/repository/prisma/prisma-users-repository";
import { EmailExist } from "@/services/error/email-exist-error";
import { makeRegister } from "@/services/factories/makeRegister";
import { RegisterServices } from "@/services/register.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerController(req: FastifyRequest, res: FastifyReply) {
    const schemaBody = z.object({
        name: z.string().trim()
            .min(2, { message: "O nome precisa ter mais de 2 caracteres" }),
        email: z.string().email({ message: "O email está inválido" }),
        password: z.string()
            .min(8, { message: "A senha precisa ter mais de 8 caracteres" })

    });
    const { name, password, email } = schemaBody.parse(req.body);
    try {
       
        const registerServices = makeRegister();

        await registerServices.execute({
            name,
            email,
            password
        })

    } catch (error) {
        if (error instanceof EmailExist) {
            return res.status(409).send({
                message: error.message
            });
        }
        
        throw error;
    }

    return res.status(201).send();
    
}