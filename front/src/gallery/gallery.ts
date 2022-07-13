import { loadGallery, fetchGallery } from './handler.js';
import { TokenService } from '../services/token.service.js';

const tokenService = new TokenService();
tokenService.checkToken();

(async () => {
  await loadGallery();
  const pages = document.getElementById('pages');
  pages.onclick = fetchGallery;
})();
