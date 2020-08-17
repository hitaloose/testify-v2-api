/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Publicador from '../models/Publicador';

class SessaoController {
  async store(req: Request, res: Response) {
    const { usuario, senha } = req.body;

    const publicador = await Publicador.findOne({ usuario });

    if (!publicador) {
      return res.status(400).json({ mensagem: 'Publicador não encontrador' });
    }

    // @ts-ignore
    if (!(await publicador.validarSenha(senha))) {
      return res.status(400).json({ mensagem: 'Senha inválida' });
    }

    const { expiresIn, secret } = authConfig;
    const { id } = publicador;
    const token = jwt.sign({ id }, secret, {
      expiresIn,
    });

    return res.json({ token });
  }
}

export default new SessaoController();
