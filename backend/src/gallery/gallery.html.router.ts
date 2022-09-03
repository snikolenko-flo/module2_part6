import express from 'express';
import { sendFile } from '../services/file.service.js';
import { log } from '../logger.js';

export const galleryHtmlRouter = express.Router();
galleryHtmlRouter.get('/', async (req, res) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await sendFile(req, res, './built/frontend/html/gallery.html', 'text/html');
});