import * as http from 'http';
import { login } from './backend/login/handler.js';
import { getGallery } from './backend/gallery/handler.js';
import { FRONT_URL, HOST, PORT } from './backend/data/constants.js';
import { HeaderService } from './backend/services/header.service.js';
import { getUrl } from './backend/services/url.service.js';
import { getOptions } from './backend/services/url.service.js';

const hostname = HOST;
const port = PORT;
const header = new HeaderService();

const server = http.createServer((req, res) => {
  (async () => {
    header.setHeaders(res);

    const url: URL = getUrl(req, FRONT_URL);
    const path = url.pathname;
    const method = req.method;

    if (path === '/login' && method === 'POST') await login(req, res);
    if (path === '/gallery' && method === 'OPTIONS') await getOptions(req, res);
    if (path === '/gallery' && method === 'GET') await getGallery(req, res);
  })();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
