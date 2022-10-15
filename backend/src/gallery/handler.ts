import { IMAGES_DIR, DEFAULT_LIMIT } from '../data/constants.js';
import { GalleryManager } from './gallery.manager.js';
import { UrlService } from '../services/url.service.js';
import { log } from '../helper/logger.js';
import { Request, Response } from 'express';
const manager = new GalleryManager();
const urlService = new UrlService();

export async function getGallery(req: Request, res: Response) {

  const pageNumber = urlService.getPageNumber(req);
  const pageLimit = urlService.getPageLimit(req);
  console.log(`pageLimit: ${pageLimit}`);
  if (!pageLimit) console.log(`pageLimit: ${pageLimit}, default pageLimit: ${DEFAULT_LIMIT}`);

  if (isNaN(pageNumber)) return manager.error.sendIsNanError(res);
  if (!isFinite(pageNumber)) return manager.error.sendFiniteError(res);

  const total = await manager.file.getTotalPages(IMAGES_DIR);

  if (pageNumber > total || pageNumber <= 0) return manager.error.sendWrongPageError(res, total);
  log.info(`The page number ${pageNumber} is ok.`);

  let pagesAmount = await manager.file.getPagesAmount(IMAGES_DIR, pageLimit);
  if (pagesAmount > total) pagesAmount = total;

  await manager.file.addImagesToDB(IMAGES_DIR);
  const imagesPaths = await manager.file.getImages(pageNumber, pageLimit);
  manager.response.sendImages(res, pagesAmount, imagesPaths);
}
