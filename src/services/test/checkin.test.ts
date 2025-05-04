import { CheckinInterfaceRepository } from "../../repository/checkin-interface-repository";
import { beforeEach, describe, expect, test } from "vitest";
import { Check_inService } from "../check_in.service";
import { InMemoryCheckins } from "../../repository/in-memory-database/InMemoryCheckins";
import { InMemoryGym } from "../../repository/in-memory-database/InMemoryGym";
import { Prisma } from "@prisma/client";
import { NotFound } from "../error/not-found";
import { vi } from "vitest";
import { InvalidCheckinError } from "../error/invalid-checkin-error";

describe("Teste do checkin",()=>{
    let checkinRepository: CheckinInterfaceRepository
    let gymRepository: InMemoryGym
    let sut: Check_inService
    beforeEach(()=>{
        checkinRepository = new InMemoryCheckins();
        gymRepository = new InMemoryGym
        sut = new Check_inService(checkinRepository,gymRepository);

        gymRepository.items.push({
            id: "idTeste",
            description:"descricao",
            phone:"4564564",
            title:"title",
            latitude: new Prisma.Decimal(-23.5522122),
            longitude: new Prisma.Decimal(-53.3386951)
        });

        vi.useFakeTimers();
        
    });
    
    test("Deve gerar um erro ao cadastrar um id de academia invalido",async()=>{
        await expect(async()=>{
            await sut.execute({gymId:"idInvalido",userId:"userId",latitude:-23.5522122,longitude:-53.3386951})
        }).rejects.toBeInstanceOf(NotFound);
    })

    test("Deve gerar um erro ao fazer mais de um checkin",async()=>{
        vi.setSystemTime(new Date(2025,3,5,8,30,20,0))
        
        await checkinRepository.create({
            gym_id: "idTeste",
            user_id: "userId"
        });

        await expect(async()=>{
            await sut.execute({gymId:"idTeste",userId:"userId",latitude:-23.5522122,longitude:-53.3386951})
        }).rejects.toBeInstanceOf(InvalidCheckinError);

    });

    
    test("Deve gerar um erro se a distancia for for maior de 100 metros",async()=>{
        vi.setSystemTime(new Date(2025,3,5,8,30,20,0))
        

        await expect(async()=>{
            await sut.execute({gymId:"idTeste",userId:"userId",latitude:-23.5545852,longitude:-53.3386951})
        }).rejects.toBeInstanceOf(Error);

    });

})