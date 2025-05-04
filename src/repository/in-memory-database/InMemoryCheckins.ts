import { Prisma, Checkins } from "@prisma/client";
import { CheckinInterfaceRepository } from "../checkin-interface-repository";

export class InMemoryCheckins implements CheckinInterfaceRepository{
    
    public items: Checkins[] = [];

    async create({ gym_id, user_id }: Prisma.CheckinsUncheckedCreateInput): Promise<Checkins> {
        const checkin: Checkins = {
            id:"checkin_id",
            gym_id: gym_id,
            user_id: user_id,
            createdAt: new Date(),
            validad_at: null
        }

        this.items.push(checkin);

        return  checkin;
    }

    async verifyDate(date: Date, user_id: string): Promise<Checkins | null> {
        
        const checkin = this.items.find((item)=>{
            const dateGym = date.getDate() == item.createdAt.getDate();
        
            return item.user_id == user_id && dateGym; 
        });

        if(!checkin){
            return null
        }
        
        return checkin
    }
    
}