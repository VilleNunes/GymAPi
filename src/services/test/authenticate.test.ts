import { InMemoryUsers } from "../../repository/in-memory-database/InMemoryUser";
import { beforeEach, describe, expect, test } from "vitest";
import { AuthenticateService } from "../authenticate.service";
import { hash } from "bcrypt";
import { CredentialInvalid } from "../error/invalid-credential-error";
import { IuserInterfaceRepository } from "@/repository/user-interface-repository";

describe("teste de autenticação de usuário", () => {

    let authenticateRepository: IuserInterfaceRepository
    let sut: AuthenticateService;

    beforeEach(()=>{
        authenticateRepository = new InMemoryUsers();
        sut = new AuthenticateService(authenticateRepository);
    });

    test("deve ser possível se autenticar", async () => {

        await authenticateRepository.create({
            nome: "john doe",
            email: "teste@email.com",
            password_hash: await hash("12345678", 8)
        });

        const { user } = await sut.execute({
            email: "teste@email.com",
            password: "12345678"
        });

        expect(user.id).toEqual(expect.any(String))
    });

    test("deve-se gerar um erro ao inserir um email errado", async () => {

        await authenticateRepository.create({
            nome: "john doe",
            email: "teste@email.com",
            password_hash: await hash("12345678", 8)
        });

        expect(async () => {
            await sut.execute({
                email: "emailErrado@email.com",
                password: "12345678"
            });
        }).rejects.toBeInstanceOf(CredentialInvalid)
    });

    test("deve-se gerar um erro ao inserir uma senha errada", async () => {

        await authenticateRepository.create({
            nome: "john doe",
            email: "teste@email.com",
            password_hash: await hash("12345678", 8)
        });

        expect(async () => {
            await sut.execute({
                email: "teste@email.com",
                password: "senhaIncorreta"
            });
        }).rejects.toBeInstanceOf(CredentialInvalid)
    })
})