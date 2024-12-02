// types/express/index.d.ts
import { User } from './models/User'; // Aqui você pode importar o tipo 'User' do seu modelo (caso tenha um)

declare global {
  namespace Express {
    interface Request {
      user?: User; // Adiciona a propriedade 'user' ao tipo Request
    }
  }
}
