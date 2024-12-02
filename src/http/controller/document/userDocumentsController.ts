import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();

class UserDocumentsController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, nome } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: 'Arquivo não encontrado.' });
      }

      const fileUrl = path.join('uploads', req.file.filename); // Caminho relativo

      // Salvar no banco de dados
      const userDocument = await prisma.userDocuments.create({
        data: {
          nome,
          url: fileUrl,
          user_id: userId,
        },
      });

      return res.status(201).json(userDocument);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar o documento.' });
    }
  }
}

export { UserDocumentsController };
