/* eslint-disable no-await-in-loop */
import { Request, Response } from 'express';

import Lista from '../models/Lista';

class ListaController {
  async index(req: Request, res: Response) {
    const { pubId } = req;

    const lista = await Lista.find({ idPublicador: pubId });

    return res.json(lista);
  }

  async store(req: Request, res: Response) {
    const { pubId } = req;
    const { numero, quantidade } = req.body;

    // deletando lista antiga
    await Lista.deleteMany({ idPublicador: pubId });

    // criando nova lista
    for (let index = 0; index < quantidade; index += index) {
      await Lista.create({
        numero: numero + index,
        idPublicador: pubId,
        ligacaoRealizada: false,
      });
    }

    return res.status(201).send();
  }
}

export default new ListaController();
