import { Request, Response } from 'express';

import Publicador from '../models/Publicador';
import Revisita from '../models/Revisita';

class RevisitaTransferenciaController {
  async store(req: Request, res: Response) {
    const { idRevisita } = req.params;
    const { usuario } = req.body;

    const revisita = await Revisita.findById(idRevisita);
    const publicador = await Publicador.findOne({ usuario });

    if (!revisita) {
      return res.status(400).json({ mensagem: 'Revisita não encontrada' });
    }
    if (!publicador) {
      return res.status(400).json({ mensagem: 'Publicador não encontrado' });
    }

    revisita.idPublicador = publicador.id;

    await revisita.save();

    return res.status(401).json(revisita);
  }
}

export default new RevisitaTransferenciaController();
