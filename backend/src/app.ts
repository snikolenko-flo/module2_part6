import * as http from 'http';
import { HOST, PORT } from './data/constants.js';
import { HeaderService } from './services/header.service.js';
import { Router } from './router.js';
import { getPath } from './services/http.service.js';

const hostname = HOST;
const port = PORT;

const header = new HeaderService();
const router = new Router();

const server = http.createServer((req, res) => {
  (async () => {
    header.setHeaders(res);
    const path = getPath(req);

    if (path === '/login') await router.login(req, res);
    if (path === '/gallery') await router.gallery(req, res);
    if (path === '/frontend') await router.frontend(req, res);
    if (path === '/backend') await router.backend(req, res);
    if (path === '/images') await router.backend(req, res);
  })();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
