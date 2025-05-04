import { PrismaUsersRepository } from "@/repository/prisma/prisma-users-repository";
import { AuthenticateService } from "../authenticate.service";

export function makeAuthenticate(){
    const userRepository = new PrismaUsersRepository();
    const services = new AuthenticateService(userRepository);

    return services;
}