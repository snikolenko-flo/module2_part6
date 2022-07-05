import { login } from './handler.js';
import { UrlService } from '../services/url.service.js';

const urlService = new UrlService();

export async function loginRouter(req, res) {
  const { path, method } = urlService.getUrlProperties(req);
  if (path === '/login' && method === 'POST') await login(req, res);
}
