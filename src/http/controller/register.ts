import { z } from "zod";
import { Request, Response } from "express";
import { makeRegistraterUseCase } from "../../use-cases/factories/make-register-use-case";

export async function register(request: Request, response: Response) {
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    birthdate: z.string().transform((str) => new Date(str)),
  });

  const { nome, email, password } = registerBodySchema.parse(request.body);
  try {
   const registerUseCase = makeRegistraterUseCase()
    await registerUseCase.execute({
      nome,
      email,
      password,
    });
  } catch (error) {
    response.status(409).send();
  }
  response.status(201).send();
}
