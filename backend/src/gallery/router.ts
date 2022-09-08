import { getGallery } from './handler.js';
import express, { Request, Response } from 'express';
import { log } from '../helper/logger.js';
import { sendFile } from '../services/file.service.js';
import { upload } from '../services/upload.service.js';

export const galleryRouter = express.Router();
galleryRouter.get('/', async(req, res) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await getGallery(req, res);
});

galleryRouter.post('/', upload.any('img'), async(req: Request, res: Response): Promise<void> => {
  log.info(`Request "${req.originalUrl}" is got.`);
  const files = req.files;
  if (!files) {
    res.status = 400;
    res.send({error: 'Upload a file please'});
    res.end();
    log.error('File was not provided.');
    return;
  }
  await sendFile(req, res, './built/frontend/html/gallery.html', 'text/html');
  log.info('A new image was uploaded to the server.');
});
