import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';


const updateAbility = async (req: Request, res: Response) => {
  console.log("asdad")
  const { id } = req.params;  // O 'id' vem da URL
  const { nome, active } = req.body;  // 'nome' e 'active' vêm do corpo da requisição
console.log("id",id)
  // Verificação se o campo 'active' foi fornecido e é um valor booleano
  if (active === undefined) {
    return res.status(400).json({ message: "'active' é um campo obrigatório" });
  }

  if (typeof active !== "boolean") {
    return res.status(400).json({ message: "'active' deve ser um valor booleano (true ou false)" });
  }

  try {
    // Atualiza a habilidade com o ID fornecido
    const ability = await prisma.abilities.update({
      where: {
        id: id,  // Passa o 'id' da URL
      },
      data: {
        nome,   // Atualiza o campo 'nome' se fornecido
        active, // Atualiza o campo 'active'
      },
    });

    return res.status(200).json(ability);  // Retorna a habilidade atualizada
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: "Erro ao atualizar habilidade", error: error.message });
    } else {
      return res.status(500).json({ message: "Erro desconhecido" });
    }
  }
};

export { updateAbility };
