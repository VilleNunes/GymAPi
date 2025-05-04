import { Prisma, Gym } from "@prisma/client";
import { gymInterfaceRepository } from "../gym-interface-repository";
import { randomUUID } from "node:crypto";


export class InMemoryGym implements gymInterfaceRepository{
    items: Gym[] = []

    async findById(gymId: string): Promise<Gym | null> {
        const gym = this.items.find((item)=>{
            return  item.id == gymId
        });

        if(!gym){
            return null
        }

        return gym;
    }
    
    

    
}