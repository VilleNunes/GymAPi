import { User, Prisma } from "@prisma/client";
import { PrismaUsersRepository } from "../prisma/prisma-users-repository";

export class InMemoryUsers implements PrismaUsersRepository {
    public items: User[] = [];

    async findByEmail(email: string): Promise<null | User> {
        const user = this.items.find((user)=>{
            return user.email == email
        });

        if(!user){
            return null;
        }

        return user
    }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user:User = {
            id: "user",
            nome: data.nome,
            email: data.email,
            password_hash: data.password_hash,
            createdAt: new Date(),
        }
        this.items.push(user);
        return user
    }

}