import { getGallery } from './handler.js';
import express, { Request, Response } from 'express';
import { log } from '../helper/logger.js';
import { FileService } from '../services/file.service.js';
import { upload } from '../services/upload.service.js';
import { PageService } from '../services/page.service.js';
import { DbService } from '../services/db-service.js';
import { UrlService } from '../services/url.service.js';

const fileService = new FileService();
const pageService = new PageService();
const dbService = new DbService();
const urlService = new UrlService();

export const galleryRouter = express.Router();

galleryRouter.get('/', async(req, res) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await getGallery(req, res);
});

galleryRouter.get('/limit', async(req, res) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await pageService.getLimit(req, res);
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

  console.log(`backend/src/gallery/router.ts/galleryRouter.post()/req.user: ${req.user}`);
  console.log(req.user);
  const filePath = urlService.getPathFromRequest(req);
  await dbService.uploadImageData(filePath);
  await fileService.sendFile(req, res, './built/frontend/html/gallery.html', 'text/html');
  log.info('A new image was uploaded to the server.');
});
