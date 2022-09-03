import { getGallery } from './handler.js';
import express from 'express';
import { log } from '../logger.js';

export const galleryRouter = express.Router();
galleryRouter.get('/', async(req, res) => {
  log.info(`Request "${req.originalUrl}" is got.`);
  await getGallery(req, res);
});
