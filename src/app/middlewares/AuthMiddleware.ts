/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express';
import { verify as verifyCb } from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

const verify = promisify(verifyCb);

class AuthMiddleware {
  async verificarToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ mensagem: 'Token não informado' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded: any = await verify(token, authConfig.secret);

      req.pubId = decoded.id;

      return next();
    } catch (err) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }
  }
}

export default new AuthMiddleware();

declare global {
  namespace Express {
    export interface Request {
      pubId: number;
    }
  }
}
