import { IuserInterfaceRepository } from "../../repository/user-interface-repository";
import { beforeEach, describe, expect, test } from "vitest";
import { GetProfileService } from "../get.profile.service";
import { InMemoryUsers } from "../../repository/in-memory-database/InMemoryUser";


describe("Teste de exibir perfil",()=>{
    let getProfileRepository: IuserInterfaceRepository;
    let sut: GetProfileService
    beforeEach(()=>{
        getProfileRepository = new InMemoryUsers();
        sut = new GetProfileService(getProfileRepository)
    })

    test("Deve ser possivel recuperar um perfil",async()=>{
        const user = await getProfileRepository.create({
            nome:"john doe",
            email:"teste@email.com",
            password_hash:"12345678"
        });

        const profile = await sut.execute({userId:user.id});

        expect(profile.profile).toEqual(expect.objectContaining({
            nome: "john doe",
            email:"teste@email.com"
        }))
    })
})