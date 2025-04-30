import { InMemoryUsers } from "../../repository/in-memory-database/InMemoryUser";
import { describe, expect, test } from "vitest";
import { RegisterServices } from "../register.services";
import { compare } from "bcrypt";
import { EmailExist } from "../error/email-exist-error";


describe("teste de cadastro de usuario", () => {
    test("Deve ser possivel cadastrar um usuario", async () => {
        const userRepository = new InMemoryUsers();
        const registerService = new RegisterServices(userRepository);

        const { user } = await registerService.execute({
            name: "userTest",
            email: "test@email.com",
            password: "12345678"
        })

        expect(user.id).toEqual(expect.any(String));
    });

    test("deve ser possivel fazer o hash da senha", async () => {
        const userRepository = new InMemoryUsers();
        const registerService = new RegisterServices(userRepository);

        const { user } = await registerService.execute({
            name: "userTest",
            email: "test@email.com",
            password: "12345678"
        });

        const hash = await compare("12345678", user.password_hash);

        expect(hash).toBe(true)
    });

    test("deve gerar um erro quando registrar com email duplicado", async () => {
        const userRepository = new InMemoryUsers();
        const registerService = new RegisterServices(userRepository);

        await registerService.execute({
            name: "userTest",
            email: "test@email.com",
            password: "12345678"
        });

        expect(async () => {
             await registerService.execute({
                name: "userTest",
                email: "test@email.com",
                password: "12345678"
            })
        }).rejects.toBeInstanceOf(EmailExist)
    })
})