import { PrismaUserRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../middlewares/authenticate";
import { RegisterUseCase } from "../register";

export function makeAuthenticateUseCase(){
  const prismaUserRepository = new PrismaUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository);
  return authenticateUseCase;
}