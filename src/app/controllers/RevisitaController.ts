import { Request, Response } from 'express';

import Revisita from '../models/Revisita';

class RevisitaControlller {
  async index(req: Request, res: Response) {
    const { pubId } = req;

    const revisitas = await Revisita.find({ idPublicador: pubId });

    return res.json(revisitas);
  }

  async show(req: Request, res: Response) {
    const { idRevisita } = req.params;

    const revisita = await Revisita.findById(idRevisita);

    return res.json(revisita);
  }

  async store(req: Request, res: Response) {
    const revisita = req.body;
    const { pubId } = req;

    const novaRevisita = await Revisita.create({
      idPublicador: pubId,
      numero: revisita.numero,
      dataProximaLigacao: revisita.dataProximaLigacao,
      nome: revisita.nome,
    });

    return res.status(201).json(novaRevisita);
  }

  async update(req: Request, res: Response) {
    const { idRevisita } = req.params;
    const revisita = req.body;

    const revisitaAtualizar = await Revisita.findById(idRevisita);

    if (!revisitaAtualizar) {
      return res.status(400).json({ mensagem: 'Revisita não encontrada' });
    }
    revisitaAtualizar.overwrite(revisita);

    await revisitaAtualizar.save();

    return res.json(revisitaAtualizar);
  }

  async delete(req: Request, res: Response) {
    const { idRevisita } = req.params;

    const revisita = await Revisita.findById(idRevisita);

    if (!revisita) {
      return res.status(400).json({ mensagem: 'Revisita não encontrada' });
    }

    await revisita.remove();

    return res.send();
  }
}

export default new RevisitaControlller();
