import { IuserInterfaceRepository } from "@/repository/user-interface-repository";
import { CredentialInvalid } from "./error/invalid-credential-error";
import { compare } from "bcrypt";

interface authenticateRequest{
    email: string,
    password:string
}

export class AuthenticateService{

    constructor(private userRepository:IuserInterfaceRepository){}

    async execute({email,password}:authenticateRequest){

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