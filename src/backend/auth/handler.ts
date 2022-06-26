import { GalleryManager } from '../gallery/gallery.manager.js';

const manager = new GalleryManager();

export async function checkAuthorization(req, res) {
  if (!req.headers.authorization) return manager.sendAuthError(res);
  if (req.headers.authorization !== 'token') return manager.sendWrongTokenError(res);
}
