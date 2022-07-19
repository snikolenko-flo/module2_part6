import * as http from 'http';
import * as fs from 'fs';
import { HOST, PORT } from './data/constants.js';
import { HeaderService } from './services/header.service.js';
import { UrlService } from './services/url.service.js';
import { loginRouter } from './login/router.js';
import { galleryRouter } from './gallery/router.js';
import { frontendRouter, backendRouter } from './router.js';

const hostname = HOST;
const port = PORT;

const header = new HeaderService();
const urlService = new UrlService();

const server = http.createServer((req, res) => {
  (async () => {
    header.setHeaders(res);

    const { path } = urlService.getUrlProperties(req);
    console.log(`app. path: ${path}`);

    const frontend = 'frontend';
    const backend = 'backend';

    if (path === '/') await renderLogin(req, res);
    if (path === '/login.html') await renderLogin(req, res);
    if (path.includes(frontend)) await frontendRouter(req, res, path);
    if (path.includes(backend)) await backendRouter(req, res, path);
    if (path === '/login') await loginRouter(req, res);
    if (path === '/gallery.html') await renderGallery(req, res);
    if (path === '/gallery') await galleryRouter(req, res);
  })();
});

async function renderLogin(req, res) {
  fs.readFile('./built/frontend/html/login.html', function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(data);
  });
}

async function renderGallery(req, res) {
  fs.readFile('./built/frontend/html/gallery.html', function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(data);
  });
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
