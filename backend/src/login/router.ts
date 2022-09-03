import { login } from './handler.js';
import express from 'express';
import { sendFile } from '../services/file.service.js';
import { log } from '../logger.js';

export const loginRouter = express.Router();
loginRouter.get('/', async (req, res) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await sendFile(req, res, './built/frontend/html/login.html', 'text/html');
});
loginRouter.post('/login', async(req, res) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await login(req, res);
});






