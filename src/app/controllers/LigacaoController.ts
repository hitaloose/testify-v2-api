import { Request, Response } from 'express';

import Ligacao from '../models/Ligacao';

class LigacaoController {
  async index(req: Request, res: Response) {
    const { idRevisita } = req.params;

    const ligacoes = await Ligacao.find({ idRevisita });

    return res.json(ligacoes);
  }

  async show(req: Request, res: Response) {
    const { idLigacao } = req.params;

    const ligacao = await Ligacao.findById(idLigacao);

    return res.json(ligacao);
  }

  async store(req: Request, res: Response) {
    const ligacao = req.body;
    const { idRevisita } = req.params;

    const novaLigacao = await Ligacao.create({
      data: ligacao.data,
      idRevisita,
      observacao: ligacao.observacao,
    });

    return res.status(201).json(novaLigacao);
  }

  async update(req: Request, res: Response) {
    const { idLigacao } = req.params;
    const ligacao = req.body;

    const ligacaoAtualizar = await Ligacao.findById(idLigacao);

    if (!ligacaoAtualizar) {
      return res.status(400).json({ mensagem: 'Ligação não encontrada' });
    }

    ligacaoAtualizar.overwrite(ligacao);
    await ligacaoAtualizar.save();

    return res.json(ligacaoAtualizar);
  }

  async delete(req: Request, res: Response) {
    const { idLigacao } = req.params;

    const ligacao = await Ligacao.findById(idLigacao);

    if (!ligacao) {
      return res.status(400).json({ mensagem: 'Ligação não encontrada' });
    }

    await ligacao.remove();

    return res.send();
  }
}

export default new LigacaoController();
