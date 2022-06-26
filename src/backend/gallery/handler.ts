import { IMAGES_DIR } from '../data/constants.js';
import { GalleryManager } from './gallery.manager.js';
import { checkAuthorization } from '../auth/handler.js';

const manager = new GalleryManager();

export async function getGallery(req, res) {
  await checkAuthorization(req, res);

  const pageNumber = manager.getPageNumber(req);
  if (isNaN(pageNumber)) return manager.sendIsNanError(res);
  if (!isFinite(pageNumber)) return manager.sendFiniteError(res);

  const total = await manager.getTotalPages(IMAGES_DIR);
  if (pageNumber > total || pageNumber <= 0) return manager.sendWrongPageError(res);

  const imagesPaths = await manager.getImages(pageNumber);
  manager.sendImages(res, imagesPaths);
}
