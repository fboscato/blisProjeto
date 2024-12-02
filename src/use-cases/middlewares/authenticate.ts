import { compare } from "bcryptjs";
import { UsersRepository } from "../../repositories/users-repository";
import { InvalidCreditialsError } from "../errors/invalid-credentials-error";
import { Users } from "@prisma/client";

interface AuthenticationUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticationUseCaseResponse {
  user: Users;
}
export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}
  async execute({ email, password }: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCreditialsError();
    }
    const doesPasswordsMatches = await compare(password, user.password);
    if (!doesPasswordsMatches) {
      throw new InvalidCreditialsError();
    }
    return { user };
  }
}
