import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repository/prisma/prisma-users-repository"
import { IuserInterfaceRepository } from "@/repository/user-interface-repository"
import { hash } from "bcrypt"
import { EmailExist } from "./error/email-exist-error"
import { User } from "@prisma/client"

interface registerReq {
    name: string
    email: string,
    password: string
}

interface registerRes{
    user:User
}

export class RegisterServices {
    constructor(private userRepository: IuserInterfaceRepository) { }

    async execute({ name, email, password }: registerReq):Promise<registerRes> {

        const userEmail = await this.userRepository.findByEmail(email)

        if (userEmail) {
            throw new EmailExist();
        }

        const password_hash = await hash(password, 8);


        const user = await this.userRepository.create({ nome: name, email, password_hash });

        return {
            user
        }
    }
}