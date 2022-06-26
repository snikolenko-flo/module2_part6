import { GalleryManager } from '../gallery/gallery.manager.js';

const manager = new GalleryManager();

export async function checkAuthorization(req, res) {
  if (!req.headers.authorization) return manager.error.sendAuthError(res);
  if (req.headers.authorization !== 'token') return manager.error.sendWrongTokenError(res);
}
