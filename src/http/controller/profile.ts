import { Request, Response } from "express";
import { makeGetUserProfileUseCase } from "../../use-cases/factories/make-get-user-profile-user";

export async function profile(request: Request, response: Response) {
  const userId = request.userId; // Já disponível graças ao middleware verifyJWT

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: userId ?? "", // Use o ID do usuário fornecido
  });

  return response.status(200).json({ user:{
    ...user,
    password: undefined
  } });
}
