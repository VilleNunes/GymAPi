import { PrismaUsersRepository } from "@/repository/prisma/prisma-users-repository";
import { RegisterServices } from "../register.services";

export function makeRegister() {
    const userRepository = new PrismaUsersRepository();
    const services = new RegisterServices(userRepository);

    return services;
}