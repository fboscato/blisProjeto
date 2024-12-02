import { PrismaUserRepository } from "../../repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegistraterUseCase(){
  const prismaUserRepository = new PrismaUserRepository();
  const registerUseCase = new RegisterUseCase(prismaUserRepository);
  return registerUseCase;
}