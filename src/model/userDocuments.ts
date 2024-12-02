import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';


const createUserDocument = async (req: Request, res: Response) => {
  try {
    
    // Verifica se o arquivo foi enviado
    console.log("vem aqui",req.file)
    if (!req.file) {
      return res.status(400).json({ message: 'Arquivo não enviado' });
    }

    // Criação do documento no banco de dados
    const userDocument = await prisma.userDocuments.create({
      data: {
        nome: req.body.nome,  // Nome do documento, enviado no corpo da requisição
        url: `/uploads/${req.file.filename}`,  // URL do arquivo armazenado
        user_id: req.body.user_id,  // ID do usuário, enviado no corpo da requisição
      },
    });

    return res.status(201).json(userDocument);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar o documento', error });
  }
};

export { createUserDocument };
