import express, { Request, Response } from 'express';
import { sendFile } from '../services/file.service.js';
import { log } from '../helper/logger.js';

export const galleryHtmlRouter = express.Router();
galleryHtmlRouter.get('/', async (req: Request, res: Response) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await sendFile(req, res, './built/frontend/html/gallery.html', 'text/html');
});