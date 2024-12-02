import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';


export const createAbility = async (req: Request, res: Response) => {
  const { nome, active } = req.body;

  // Verificar se os dados estão corretos
  if (!nome || typeof nome !== "string") {
    return res.status(400).json({ message: "Nome da habilidade é obrigatório e deve ser uma string" });
  }

  // Se a habilidade não especificar 'active', ela será ativada por padrão
  const isActive = active !== undefined ? active : true;

  try {
    const ability = await prisma.abilities.create({
      data: {
        nome: nome,
        active: isActive,
      },
    });
    return res.status(201).json(ability);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar a habilidade", error });
  }
};