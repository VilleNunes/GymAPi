import { Gym, Prisma } from "@prisma/client";


export interface gymInterfaceRepository{
    findById(gym:string):Promise<Gym|null>
}