import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repository/prisma/prisma-users-repository"
import { IuserInterfaceRepository } from "@/repository/user-interface-repository"
import { hash } from "bcrypt"
import { EmailExist } from "./error/email-exist-error"

interface registerReq {
    name: string
    email: string,
    password: string
}

export class RegisterServices {
    constructor(private userRepository:IuserInterfaceRepository){}

    async execute({ name, email, password }: registerReq) {

        const user = await this.userRepository.findByEmail(email)

        if (user) {
            throw new EmailExist();
        }

        const password_hash = await hash(password, 8);

        

        await this.userRepository.create({ nome: name, email, password_hash });
    }
}