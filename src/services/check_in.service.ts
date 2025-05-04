import { CheckinInterfaceRepository } from "@/repository/checkin-interface-repository";
import { gymInterfaceRepository } from "@/repository/gym-interface-repository";
import { NotFound } from "./error/not-found";
import { InvalidCheckinError } from "./error/invalid-checkin-error";
import { getDistanceBetweenCoordinates } from "../utils/Distancia";

interface CheckInReq{
    userId: string,
    gymId:string,
    latitude:number,
    longitude:number
}
export class Check_inService{
    constructor(
        private checkinRepository: CheckinInterfaceRepository,
        private gymRepository: gymInterfaceRepository
    ){}

    async execute({gymId,userId,latitude,longitude}:CheckInReq){
        
        const gym = await this.gymRepository.findById(gymId);

        if(!gym){
            throw new NotFound();
        }

        const distance = getDistanceBetweenCoordinates(
            {longitude:longitude,latitude:latitude},
            {longitude:gym.longitude.toNumber(),latitude:gym.latitude.toNumber()}
        );

        const MAX_DISTANCE = 0.1;
        console.log(distance)
        if(distance > MAX_DISTANCE){
            throw new Error();
        }
        
        const checkinExist = await this.checkinRepository.verifyDate(
            new Date(),
            userId
        );

        if(checkinExist){
            throw new InvalidCheckinError();
        }

        const checkin = await this.checkinRepository.create({
            gym_id:gymId,
            user_id:userId
        });

        return{
            checkin
        }


    }
}