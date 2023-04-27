import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { router } from './routes';
import { handleError } from './middlewares/handleError';

const PORT = 4000;

const app = express();
app.use(express.json());

app.use(cors());
app.use(router);

app.use( handleError );

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}"`));