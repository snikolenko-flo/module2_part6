import { getGallery } from './handler.js';
import express from 'express';
import { log } from '../services/logger.service.js';
import { sendFile } from '../services/file.service.js';
import { upload } from '../services/upload.service.js';

export const galleryRouter = express.Router();
galleryRouter.get('/', async(req, res) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await getGallery(req, res);
});

galleryRouter.post('/', upload.any('img'), async(req, res) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  const file = req.file;
  if (!file) {
    log.error('File was not provided.');
    res.status = 400;
    res.send({error: 'Upload a file please'});
    res.end();
    return;
  }
  await sendFile(req, res, './built/frontend/html/gallery.html', 'text/html');
  log.info('New image is uploaded to the server.');
});
