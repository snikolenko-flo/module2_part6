import * as http from 'http';
import { HOST, PORT } from './backend/data/constants.js';
import { HeaderService } from './backend/services/header.service.js';
import { UrlService } from './backend/services/url.service.js';
import { loginRouter } from './backend/login/router.js';
import { galleryRouter } from './backend/gallery/router.js';

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
