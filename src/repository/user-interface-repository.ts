import { Prisma, User } from "@prisma/client";

export interface IuserInterfaceRepository{
    create(data:Prisma.UserCreateInput):Promise<User>
    findByEmail(email:string):Promise<null|User>
    findById(userID:string):Promise<null|User>
}