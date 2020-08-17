import cors from 'cors';
import express from 'express';

import { routes } from './routes';
import './lib/mongoose';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

export { app };
