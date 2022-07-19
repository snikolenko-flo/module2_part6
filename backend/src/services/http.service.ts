import { UrlService } from './url.service.js';

const urlService = new UrlService();

export async function getOptions(req, res) {
  res.statusCode = 200;
  res.end();
}

export function getPath(req) {
  const { path } = urlService.getUrlProperties(req);

  if (path === '/' || path === '/login') return '/login';
  if (path === '/gallery' || path === '/gallery.html') return '/gallery';
  if (path.startsWith('/frontend')) return '/frontend';
  if (path.startsWith('/backend')) return '/backend';

  return path;
}
