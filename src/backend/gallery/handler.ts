import { IMAGES_DIR } from '../data/constants.js';
import { GalleryManager } from './gallery.manager.js';
import { checkAuthorization } from '../auth/handler.js';
import { getPageNumber } from '../services/url.service.js';

const manager = new GalleryManager();

export async function getGallery(req, res) {
  await checkAuthorization(req, res);

  const pageNumber = getPageNumber(req);
  if (isNaN(pageNumber)) return manager.error.sendIsNanError(res);
  if (!isFinite(pageNumber)) return manager.error.sendFiniteError(res);

  const total = await manager.file.getTotalPages(IMAGES_DIR);
  if (pageNumber > total || pageNumber <= 0) return manager.error.sendWrongPageError(res, total);

  const imagesPaths = await manager.file.getImages(pageNumber);
  manager.response.sendImages(res, total, imagesPaths);
}
