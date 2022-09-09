import express, { Request, Response } from 'express';
import { FileService } from '../services/file.service.js';
import { log } from '../helper/logger.js';

const fileService = new FileService();

export const galleryHtmlRouter = express.Router();
galleryHtmlRouter.get('/', async (req: Request, res: Response) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await fileService.sendFile(req, res, './built/frontend/html/gallery.html', 'text/html');
});