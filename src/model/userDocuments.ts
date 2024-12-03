import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const createUserDocument = async (req: Request, res: Response) => {
  try {
    // Verifica se o arquivo foi enviado
    console.log("vem aqui", req.file);
    if (!req.file) {
      return res.status(400).json({ message: 'Arquivo não enviado' });
    }

    // Verifica se o nome do documento foi enviado
    console.log("req.body",req.body.nome)
    if (!req.body.nome) {
      return res.status(400).json({ message: 'Nome do documento não fornecido' });
    }

    // Verifica se o user_id foi enviado
    if (!req.body.user_id) {
      return res.status(400).json({ message: 'ID do usuário não fornecido' });
    }

    // Verifica se o campo user_id corresponde a um usuário válido
    const userExists = await prisma.users.findUnique({
      where: { id: req.body.user_id },
    });

    if (!userExists) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Criação do documento no banco de dados
    const userDocument = await prisma.userDocuments.create({
      data: {
        nome: req.body.nome,  // Nome do documento
        url: `/uploads/${req.file.filename}`,  // Caminho do arquivo armazenado
        user_id: req.body.user_id,  // ID do usuário
      },
    });

    return res.status(201).json(userDocument);
  } catch (error) {
    console.error("Erro ao criar o documento", error);
    return res.status(500).json({ message: 'Erro ao criar o documento', error});
  }
};

export { createUserDocument };
