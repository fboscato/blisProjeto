import { Abilities, Prisma, Users } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUserRepository implements UsersRepository {
  async update(id: string, data: Prisma.AbilitiesUpdateInput): Promise<Abilities> {
    const updatedAbility = await prisma.abilities.update({
      where: {
        id,
      },
      data,
    });
    return updatedAbility;
  }
  async delete(id: string): Promise<Abilities | null> {
    const deletedAbility = await prisma.abilities.delete({
      where: {
        id,
      },
    });
    return deletedAbility;
  }
  async findAllAbilidade(): Promise<Abilities[]> {
    const abilities = await prisma.abilities.findMany();
    return abilities;
  }
  async findById(id: string) {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    })

    return user
  }
  async findByEmail(email: string): Promise<Users | null> {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    return user;
  }
  async create(data: Prisma.UsersCreateInput) {
    const user = await prisma.users.create({
      data,
    });
    return user;
  }


}