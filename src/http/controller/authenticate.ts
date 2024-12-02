import { z } from "zod";
import { Request, Response } from "express";
import { InvalidCreditialsError } from "../../use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "../../use-cases/factories/make-authenticate-use-case";
import jwt from 'jsonwebtoken';
import { env } from "../../env";
export async function authenticate(request: Request, response: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);
  try {
    const authenticateUseCase = makeAuthenticateUseCase();
   const {user} = await authenticateUseCase.execute({
      email,
      password,
    });
    const token = jwt.sign(
      {
        id: user.id,
      },
      env.JWT_SECRET,
      {
        expiresIn: '1d',     
      },
    )
    console.log("vem aqui", token);
    response.status(201).send(token);
  } catch (error) {
    if (error instanceof InvalidCreditialsError) {
      response.status(409).send();
    }
  }
}
