import * as http from 'http';
import { opendir } from 'node:fs/promises';
import { PER_PAGE } from './data/constants.js';
import { users } from './data/users.js';

const hostname = '127.0.0.1';
const port = 3000;
const frontUrl = 'http://127.0.0.1:5500';

const server = http.createServer((req, res) => {
  (async () => {
    setHeaders(res);
    const url: URL = getUrl(req);

    if (url.pathname === '/login' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const bodyObj = JSON.parse(body);
        const user = users.find((item) => item.email == bodyObj.email);
        if (user.password === bodyObj.password) {
          res.statusCode = 200;
          res.end(JSON.stringify({ token: 'token' }));
        } else {
          res.statusCode = 401;
          res.end(JSON.stringify({ errorMessage: 'Email or password are invalid.' }));
        }
      });
    }

    if (url.pathname === '/gallery') {
      setHeaders(res);
      const page = url.searchParams.get('page');

      const total = 5;
      const pageNumber: number = parseInt(page);

      if (isNaN(pageNumber)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'The page number should be an integer' }));
      } else if (!isFinite(pageNumber)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'The page number should be a finite integer' }));
      } else if (pageNumber > total || pageNumber <= 0) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'Page should be greater than 0 and less than 6' }));
      } else {
        const totalPages = Number(page) * PER_PAGE;
        const endIndex = totalPages - 1;
        const start = endIndex + 1 - PER_PAGE;

        const urls = await openImages();
        const newArray = urls.slice(start, endIndex + 1);

        res.statusCode = 200;
        res.end(
          JSON.stringify({
            total: 5,
            objects: newArray,
          }),
        );
      }
    }
  })();
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

function setHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-amz-date, x-amz-security-token, x-amz-user-agent, x-api-key',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
}

function getUrl(req) {
  return new URL(req.url, frontUrl);
}
