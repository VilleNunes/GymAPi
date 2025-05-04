import { IuserInterfaceRepository } from "@/repository/user-interface-repository";
import { CredentialInvalid } from "./error/invalid-credential-error";
import { compare } from "bcrypt";
import { User } from "@prisma/client";

interface authenticateRequest{
    email: string,
    password:string
}

interface authenticateRes{
    user:User
}

export class AuthenticateService{

    constructor(private userRepository:IuserInterfaceRepository){}

    async execute({email,password}:authenticateRequest):Promise<authenticateRes>{

        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new CredentialInvalid();
        }

        const doesMatchPassword = await compare(password,user.password_hash);

        if(!doesMatchPassword){
            throw new CredentialInvalid();
        }

        return{
            user
        }

    }
}