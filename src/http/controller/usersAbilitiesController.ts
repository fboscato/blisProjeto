import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

// Função para criar o relacionamento entre usuário e habilidade


// Função para criar o relacionamento entre usuário e habilidade
export const createUserAbility = async (req: Request, res: Response) => {
  const { userId, abilityId, years_experience } = req.body;

  // Validação dos anos de experiência
  if (years_experience < 0) {
    return res.status(400).json({ message: "Years experience must be greater than or equal to 0" });
  }

  try {
    // Verifica se a habilidade está ativa
    const ability = await prisma.abilities.findUnique({
      where: { id: abilityId },
    });

    if (!ability || !ability.active) {
      return res.status(400).json({ message: "The ability must be active to associate with a user" });
    }

    // Criação do relacionamento na tabela UsersAbilities
    const userAbility = await prisma.usersAbilities.create({
      data: {
        user_id: userId,
        ability_id: abilityId,
        years_experience: years_experience,
      },
    });

    return res.status(201).json(userAbility);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar o relacionamento", error });
  }
};


// Função para deletar o relacionamento entre usuário e habilidade
export const deleteUserAbility = async (req: Request, res: Response) => {
  const { userId, abilityIds } = req.body;  // userId e uma lista de abilityIds para deletar

  if (!userId || !Array.isArray(abilityIds) || abilityIds.length === 0) {
    return res.status(400).json({ message: "'userId' e 'abilityIds' são obrigatórios e 'abilityIds' deve ser um array" });
  }

  try {
    // Deletando os relacionamentos da tabela UsersAbilities
    const deleteResult = await prisma.usersAbilities.deleteMany({
      where: {
        user_id: userId,
        ability_id: { in: abilityIds },  // Verifica se o ability_id está na lista de abilityIds
      },
    });

    if (deleteResult.count === 0) {
      return res.status(404).json({ message: "Nenhuma habilidade encontrada para o usuário fornecido" });
    }

    return res.status(200).json({ message: "Relacionamento deletado com sucesso", deletedCount: deleteResult.count });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar o relacionamento", error });
  }
};

// Função para listar as habilidades do usuário com paginação
export const getUserAbilities = async (req: Request, res: Response) => {
  const { userId, page = "1", pageSize = "10" } = req.query;

  // Converter page e pageSize para números
  const pageNumber = Number(page);
  const pageSizeNumber = Number(pageSize);

  // Verificar se a conversão foi bem-sucedida
  if (isNaN(pageNumber) || isNaN(pageSizeNumber)) {
    return res.status(400).json({ message: "Page and pageSize must be valid numbers" });
  }

  const skip = (pageNumber - 1) * pageSizeNumber;
  if (typeof userId !== "string") {
    return res.status(400).json({ message: "userId must be a string" });
  }

  try {
    const userAbilities = await prisma.usersAbilities.findMany({
      where: { user_id: userId },
      skip: skip,
      take: pageSizeNumber,
      orderBy: { created_at: "desc" },
      include: {
        ability: true,  // Inclui as informações da habilidade associada
        user: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });

    return res.status(200).json(userAbilities);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar habilidades do usuário", error });
  }
};
