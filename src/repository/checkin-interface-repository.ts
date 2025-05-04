import { Checkins, Prisma } from "@prisma/client";


export interface CheckinInterfaceRepository{
    create({gym_id,user_id}:Prisma.CheckinsUncheckedCreateInput):Promise<null|Checkins>
    verifyDate(data:Date,userId:string):Promise<Checkins|null>
}