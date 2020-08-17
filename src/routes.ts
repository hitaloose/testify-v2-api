import { Router } from 'express';

import LigacaoController from './app/controllers/LigacaoController';
import ListaController from './app/controllers/ListaController';
import ListaLigacaoRealizadaController from './app/controllers/ListaLigacaoRealizadaController';
import ListaRevisitaController from './app/controllers/ListaRevisitaController';
import PublicadorController from './app/controllers/PublicadorController';
import RevisitaController from './app/controllers/RevisitaController';
import RevistaTransferenciaController from './app/controllers/RevistaTransferenciaController';
import SessaoController from './app/controllers/SessaoController';
import AuthMiddleware from './app/middlewares/AuthMiddleware';

const routes = Router();

routes.post('/sessao', SessaoController.store);
routes.post('/publicador', PublicadorController.store);

routes.use(AuthMiddleware.verificarToken);

routes.post('/lista', ListaController.store);
routes.get('/lista', ListaController.index);

routes.post(
  '/lista/:idLista/ligacaoRealizada',
  ListaLigacaoRealizadaController.store
);
routes.post('/lista/:idLista/revisita', ListaRevisitaController.store);

routes.get('/revisita', RevisitaController.index);
routes.get('/revisita/:idRevisita', RevisitaController.show);
routes.post('/revisita', RevisitaController.store);
routes.put('/revisita/:idRevista', RevisitaController.update);
routes.delete('/revisita/:idRevista', RevisitaController.delete);

routes.post(
  '/revisita/:idRevista/transferencia',
  RevistaTransferenciaController.store
);

routes.get('/revisita/:idRevisita/ligacao', LigacaoController.index);
routes.get('/revisita/:idRevisita/ligacao/:idLigacao', LigacaoController.show);
routes.post('/revisita/:idRevisita/ligacao', LigacaoController.store);
routes.put(
  '/revisita/:idRevisita/ligacao/:idLigacao',
  LigacaoController.update
);
routes.delete(
  '/revisita/:idRevisita/ligacao/:idLigacao',
  LigacaoController.delete
);

export { routes };
