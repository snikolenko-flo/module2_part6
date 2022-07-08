import * as http from 'http';
import { HOST, PORT } from './data/constants.js';
import { HeaderService } from './services/header.service.js';
import { UrlService } from './services/url.service.js';
import { loginRouter } from './login/router.js';
import { galleryRouter } from './gallery/router.js';

const hostname = HOST;
const port = PORT;

const header = new HeaderService();
const urlService = new UrlService();

const server = http.createServer((req, res) => {
  (async () => {
    header.setHeaders(res);

    const { path } = urlService.getUrlProperties(req);

    if (path === '/login') await loginRouter(req, res);
    if (path === '/gallery') await galleryRouter(req, res);
  })();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
