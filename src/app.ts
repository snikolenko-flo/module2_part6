import * as http from 'http';
import { opendir } from 'node:fs/promises';
import { BASE_URL } from './data/constants';
import { PER_PAGE } from './data/constants.js';

const hostname = '127.0.0.1';
const port = 3000;
const frontUrl = 'http://127.0.0.1:5500';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  const current_url = new URL(req.url, frontUrl);
  const pathname = current_url.pathname;

  if (pathname === '/login') {
    res.end(JSON.stringify({ token: 'token' }));
  } else if (pathname === '/gallery') {
    const search_params = current_url.searchParams;
    const page = search_params.get('page');

    openImages().then((urls) => {
      const totalPages = Number(page) * PER_PAGE;
      const endIndex = totalPages - 1;
      const start = endIndex + 1 - PER_PAGE;

      const newArray = urls.slice(start, endIndex + 1);

      res.end(
        JSON.stringify({
          errorMessage: 'errorMessage',
          message: 'message',
          total: 5,
          objects: newArray,
        }),
      );
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function openImages() {
  try {
    const imagesArray = [];
    const imagesDir = './src/images';
    const dir = await opendir('./src/images');

    for await (const dirent of dir) {
      imagesArray.push(imagesDir + '/' + dirent.name);
    }
    return imagesArray;
  } catch (err) {
    console.error(err);
  }
}
