import * as http from 'http';
import { opendir } from 'node:fs/promises';
import { PER_PAGE } from './data/constants.js';
import { users } from './data/users.js';

const IMAGES_DIR = './src/images';
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

    if (url.pathname === '/gallery' && req.method === 'OPTIONS') {
      res.statusCode = 200;
      res.end();
    } else if (url.pathname === '/gallery') {
      setHeaders(res);
      const page = url.searchParams.get('page');
      const pageNumber: number = parseInt(page);
      const total = await getTotalPages(IMAGES_DIR);

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
        const urls = await getImages(pageNumber);

        res.statusCode = 200;
        res.end(
          JSON.stringify({
            total: 5,
            objects: urls,
          }),
        );
      }
    }
  })();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function getTotalPages(dir) {
  const filesAmount = await getFilesAmount(dir);
  return filesAmount / PER_PAGE;
}

async function getFilesAmount(directory) {
  try {
    const dir = await opendir(directory);

    let counter = 0;
    for await (const dirent of dir) {
      if (!dirent.name.startsWith('.')) {
        counter++;
      }
    }
    return counter;
  } catch (err) {
    console.error(err);
  }
}

async function getAllFiles(directory): Promise<string[]> {
  const files = [];
  const dir = await opendir(directory);

  for await (const dirent of dir) {
    if (!dirent.name.startsWith('.')) {
      files.push(directory + '/' + dirent.name);
    }
  }
  return files;
}

async function getImagesPerPage(images: string[], page: number, perPage: number) {
  const endIndex = page * perPage;
  const start = endIndex - perPage;
  return images.slice(start, endIndex);
}

async function getImages(page: number): Promise<string[]> {
  const images = await getAllFiles(IMAGES_DIR);
  return await getImagesPerPage(images, page, PER_PAGE);
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
