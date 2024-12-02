import { hash } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";


interface RegisterUseCaseResponse {
  nome: string;
  email: string;
  password: string;
}
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ 
    nome, 
    email, 
    password 
  }: RegisterUseCaseResponse) {
    const password_hash = await hash(password, 6);
    const userWithSomeEmail = await this.usersRepository.findByEmail(email)
    if (userWithSomeEmail) {
      throw new Error("Email já cadastrado");
    }

    await this.usersRepository.create({
      nome,
      email,
      password: password_hash,
      birthdate: new Date(),
    });
  }
}
