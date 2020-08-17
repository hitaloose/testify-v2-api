import { Request, Response } from 'express';

import Lista from '../models/Lista';

class ListaLigacaoRealizadaController {
  async store(req: Request, res: Response) {
    const { idLista } = req.params;
    const { ligacaoRealizada } = req.body;

    const lista = await Lista.findById(idLista);

    if (!lista) {
      return res.status(400).json({ mensagem: 'Lista não encontrada' });
    }

    lista.ligacaoRealizada = ligacaoRealizada;

    await lista.save();

    return res.json(lista);
  }
}

export default new ListaLigacaoRealizadaController();
