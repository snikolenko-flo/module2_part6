import { IMAGES_DIR } from '../data/constants.js';
import { GalleryManager } from './gallery.manager.js';
import { UrlService } from '../services/url.service.js';
import { log } from '../logger.js';

const manager = new GalleryManager();
const urlService = new UrlService();

export async function getGallery(req, res) {

  const pageNumber = urlService.getPageNumber(req);
  if (isNaN(pageNumber)) return manager.error.sendIsNanError(res);
  if (!isFinite(pageNumber)) return manager.error.sendFiniteError(res);

  const total = await manager.file.getTotalPages(IMAGES_DIR);
  if (pageNumber > total || pageNumber <= 0) return manager.error.sendWrongPageError(res, total);

  const imagesPaths = await manager.file.getImages(pageNumber);
  manager.response.sendImages(res, total, imagesPaths);
  log.info(`Gallery is open at the page ${pageNumber}`);
}