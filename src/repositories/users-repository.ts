import { Abilities, Prisma, Users } from "@prisma/client";

export interface UsersRepository {
  findById(id: string): Promise<Users | null>
  findByEmail(email: string):Promise<Users| null>
  create(data: Prisma.UsersCreateInput): Promise<Users>;
  update(id: string, data: Prisma.AbilitiesUpdateInput): Promise<Abilities>; // Atualiza a habilidade
  delete(id: string): Promise<Abilities | null>; 
  findAllAbilidade(): Promise<Abilities[]>;  
}