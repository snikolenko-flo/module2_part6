import * as http from 'http';
import { login } from './backend/login/handler.js';
import { getGallery, getUrl, setHeaders, getOptions } from './backend/gallery/handler.js';
import { HOST, PORT } from './backend/data/constants.js';

const hostname = HOST;
const port = PORT;

const server = http.createServer((req, res) => {
  (async () => {
    setHeaders(res);

    const url: URL = getUrl(req);
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
