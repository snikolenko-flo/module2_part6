import { UrlService } from './services/url.service.js';
import { sendFile } from './services/file.service.js';
import { getOptions } from './services/http.service.js';
import { getGallery } from './gallery/handler.js';
import { login } from './login/handler.js';

export class Router {
  url: UrlService;
  galleryPage: string;
  loginPage: string;
  contentType: {
    js: string;
    css: string;
    html: string;
  };

  constructor() {
    this.url = new UrlService();
    this.galleryPage = './built/frontend/html/gallery.html';
    this.loginPage = './built/frontend/html/login.html';
    this.contentType = {
      js: 'application/javascript',
      css: 'text/css',
      html: 'text/html',
    };
  }

  async frontend(req, res) {
    const { path } = this.url.getUrlProperties(req);

    let contentType = this.contentType.js;
    if (path.endsWith('css')) contentType = this.contentType.css;
    await sendFile(req, res, `./built${path}`, contentType);
  }

  async backend(req, res) {
    const { path } = this.url.getUrlProperties(req);
    await sendFile(req, res, `./built${decodeURI(path)}`, this.contentType.js);
  }

  async gallery(req, res) {
    const { path, method } = this.url.getUrlProperties(req);

    if (path === '/gallery.html') await sendFile(req, res, this.galleryPage, this.contentType.html);
    if (path === '/gallery' && method === 'OPTIONS') await getOptions(req, res);
    if (path === '/gallery' && method === 'GET') await getGallery(req, res);
  }

  async login(req, res) {
    const { path, method } = this.url.getUrlProperties(req);

    if (path === '/login' && method === 'POST') await login(req, res);
    if (path === '/' && method === 'GET') await sendFile(req, res, this.loginPage, this.contentType.html);
    if (path === '/login' && method === 'GET') await sendFile(req, res, this.loginPage, this.contentType.html);
  }
}
