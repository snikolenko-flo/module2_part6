import { PER_PAGE, IMAGES_DIR } from '../data/constants.js';
import { opendir, stat } from 'node:fs/promises';

export class GalleryFile {
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
  async getTotalPages(dir) {
    const filesAmount = await this.getFilesAmount(dir);
    return filesAmount / PER_PAGE;
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
    const images = await this.getAllFiles(IMAGES_DIR);
    return await this.getImagesPerPage(images, page, PER_PAGE);
  }
}
