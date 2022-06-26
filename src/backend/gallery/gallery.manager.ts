import { FRONT_URL, IMAGES_DIR, PER_PAGE } from '../data/constants.js';
import { opendir, stat } from 'node:fs/promises';
import { getUrl } from '../services/url.service.js';

const imagesDir = IMAGES_DIR;

export class GalleryManager {
  async getTotalPages(dir) {
    const filesAmount = await this.getFilesAmount(dir);
    return filesAmount / PER_PAGE;
  }

  async getFilesAmount(directory, counter?) {
    try {
      const dir = await opendir(directory);

      counter = counter || 0;
      for await (const dirent of dir) {
        if (!dirent.name.startsWith('.')) {
          const isDir = await stat(directory + '/' + dirent.name);
          if (isDir.isDirectory()) {
            counter = await this.getFilesAmount(directory + '/' + dirent.name, counter);
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

  sendIsNanError(res) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: 'The page number should be an integer bla' }));
  }

  sendFiniteError(res) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: 'The page number should be a finite integer bla' }));
  }

  sendWrongPageError(res) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: 'Page should be greater than 0 and less than 6' }));
  }

  sendAuthError(res) {
    res.statusCode = 401;
    res.end(JSON.stringify({ message: 'Auth token should be provided for authorization' }));
  }

  sendWrongTokenError(res) {
    res.statusCode = 401;
    res.end(JSON.stringify({ message: 'The auth token is not valid' }));
  }

  async getAllFiles(directory, files?: string[]): Promise<string[]> {
    const dir = await opendir(directory);

    files = files || [];

    for await (const dirent of dir) {
      if (!dirent.name.startsWith('.')) {
        const isDir = await stat(directory + '/' + dirent.name);
        if (isDir.isDirectory()) {
          files = await this.getAllFiles(directory + '/' + dirent.name, files);
        } else {
          files.push(directory + '/' + dirent.name);
        }
      }
    }
    return files;
  }

  async getImagesPerPage(images: string[], page: number, perPage: number) {
    const endIndex = page * perPage;
    const start = endIndex - perPage;
    return images.slice(start, endIndex);
  }

  async getImages(page: number): Promise<string[]> {
    const images = await this.getAllFiles(imagesDir);
    return await this.getImagesPerPage(images, page, PER_PAGE);
  }

  sendImages(res, urls) {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        total: 5,
        objects: urls,
      }),
    );
  }

  getPageNumber(req) {
    const url: URL = getUrl(req, FRONT_URL);
    const page = url.searchParams.get('page');
    return parseInt(page);
  }
}
