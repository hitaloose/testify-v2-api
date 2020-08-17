import { Request, Response } from 'express';

import Publicador from '../models/Publicador';

class PublicadorController {
  async store(req: Request, res: Response) {
    const { usuario, senha, senhaConfirmacao } = req.body;

    if (senha !== senhaConfirmacao) {
      return res.status(400).json({ mensagem: 'Senhas não batem' });
    }

    const publicadorValidacao = await Publicador.findOne({ usuario });

    if (publicadorValidacao) {
      return res.status(400).json({ mensagem: 'Usuário já cadastrado' });
    }

    const novoPublicador = await Publicador.create({ usuario, senha });

    return res.status(201).json(novoPublicador);
  }
}

export default new PublicadorController();
