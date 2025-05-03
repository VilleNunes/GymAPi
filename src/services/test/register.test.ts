import { InMemoryUsers } from "../../repository/in-memory-database/InMemoryUser";
import { beforeEach, describe, expect, test } from "vitest";
import { RegisterServices } from "../register.services";
import { compare } from "bcrypt";
import { EmailExist } from "../error/email-exist-error";
import { IuserInterfaceRepository } from "@/repository/user-interface-repository";



describe("teste de cadastro de usuario", () => {

    let registerRepository: IuserInterfaceRepository
    let sut: RegisterServices;

    beforeEach(()=>{
        registerRepository = new InMemoryUsers();
        sut = new RegisterServices(registerRepository);
    });

    test("Deve ser possivel cadastrar um usuario", async () => {
       
        const { user } = await sut.execute({
            name: "userTest",
            email: "test@email.com",
            password: "12345678"
        })

        expect(user.id).toEqual(expect.any(String));
    });

    test("deve ser possivel fazer o hash da senha", async () => {
       
        const { user } = await sut.execute({
            name: "userTest",
            email: "test@email.com",
            password: "12345678"
        });

        const hash = await compare("12345678", user.password_hash);

        expect(hash).toBe(true)
    });

    test("deve gerar um erro quando registrar com email duplicado", async () => {
       
        await sut.execute({
            name: "userTest",
            email: "test@email.com",
            password: "12345678"
        });

        expect(async () => {
             await sut.execute({
                name: "userTest",
                email: "test@email.com",
                password: "12345678"
            })
        }).rejects.toBeInstanceOf(EmailExist)
    })
})