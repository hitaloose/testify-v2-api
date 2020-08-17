import { Request, Response } from 'express';

import Lista from '../models/Lista';
import Revisita from '../models/Revisita';

class ListaRevisitaController {
  async store(req: Request, res: Response) {
    const { idLista } = req.params;

    const lista = await Lista.findById(idLista);

    if (!lista) {
      return res.status(400).json({ mensagem: 'Lista não encontrada' });
    }

    const novaRevisita = await Revisita.create({
      idPublicador: lista.idPublicador,
      numero: lista.numero,
    });

    return res.status(201).json(novaRevisita);
  }
}

export default new ListaRevisitaController();
