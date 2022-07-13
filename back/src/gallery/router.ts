import { getGallery } from './handler.js';
import { getOptions } from '../services/http.service.js';
import { UrlService } from '../services/url.service.js';

const urlService = new UrlService();

export async function galleryRouter(req, res) {
  const { path, method } = urlService.getUrlProperties(req);

  if (path === '/gallery' && method === 'OPTIONS') await getOptions(req, res);
  if (path === '/gallery' && method === 'GET') await getGallery(req, res);
}
