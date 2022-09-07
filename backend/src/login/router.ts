import { login } from './handler.js';
import express, { Request, Response } from 'express';
import { sendFile } from '../services/file.service.js';
import { log } from '../services/logger.service.js';

export const loginRouter = express.Router();

loginRouter.get('/', async (req: Request, res: Response) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await sendFile(req, res, './built/frontend/html/login.html', 'text/html');
});

loginRouter.post('/login', async(req: Request, res: Response) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await login(req, res);
});




