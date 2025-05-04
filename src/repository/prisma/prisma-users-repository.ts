import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { IuserInterfaceRepository } from "../user-interface-repository";

export class PrismaUsersRepository implements IuserInterfaceRepository{
    findById(userID: string): Promise<null | User> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email: string): Promise<null | User> {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        });
        
        return user
    }
    async create(data:Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data:data
        })
        return user;
    }
}