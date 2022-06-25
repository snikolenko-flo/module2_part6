import { PER_PAGE } from '../../data/constants.js';
import { opendir, stat } from 'node:fs/promises';

const IMAGES_DIR = './src/images';
const frontUrl = 'http://127.0.0.1:5500';

export async function getOptions(req, res) {
  res.statusCode = 200;
  res.end();
}
export async function getGallery(req, res) {
  const url: URL = getUrl(req);
  const page = url.searchParams.get('page');
  const pageNumber: number = parseInt(page);
  const total = await getTotalPages(IMAGES_DIR);

  if (isNaN(pageNumber)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: 'The page number should be an integer bla bla bla' }));
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

async function getTotalPages(dir) {
  const filesAmount = await getFilesAmount(dir);
  console.log(`filesAmount: ${filesAmount}`);
  return filesAmount / PER_PAGE;
}

async function getFilesAmount(directory, counter?) {
  try {
    const dir = await opendir(directory);

    counter = counter || 0;
    for await (const dirent of dir) {
      if (!dirent.name.startsWith('.')) {
        const isDir = await stat(directory + '/' + dirent.name);
        if (isDir.isDirectory()) {
          counter = await getFilesAmount(directory + '/' + dirent.name, counter);
        } else {
          counter++;
        }
      }
    }
    return counter;
  } catch (err) {
    console.error(err);
  }
}

async function getAllFiles(directory, files?: string[]): Promise<string[]> {
  // const files = [];
  const dir = await opendir(directory);

  files = files || [];

  for await (const dirent of dir) {
    if (!dirent.name.startsWith('.')) {
      const isDir = await stat(directory + '/' + dirent.name);
      if (isDir.isDirectory()) {
        files = await getAllFiles(directory + '/' + dirent.name, files);
        console.log(`${dirent.name} is a directory!`);
      } else {
        files.push(directory + '/' + dirent.name);
      }
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

export function getUrl(req) {
  return new URL(req.url, frontUrl);
}

export function setHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-amz-date, x-amz-security-token, x-amz-user-agent, x-api-key',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
}
