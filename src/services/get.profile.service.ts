import { IuserInterfaceRepository } from "@/repository/user-interface-repository";
import { User } from "@prisma/client";
import { NotFound } from "./error/not-found";

interface GetProfileReq{
    userId: string
}

interface GetProfileRes{
    profile:User
}

export class GetProfileService{

    constructor(private GetProfileRepository:IuserInterfaceRepository){}

    async execute({userId}:GetProfileReq):Promise<GetProfileRes>{
        const profile = await this.GetProfileRepository.findById(userId);

        if(!profile){
            throw new NotFound()
        }

        return{
            profile
        }
    }
}