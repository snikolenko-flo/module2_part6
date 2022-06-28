import { PER_PAGE, IMAGES_DIR } from '../data/constants.js';
import { opendir, stat } from 'node:fs/promises';

export class GalleryFile {
  async getFilesAmount(directory: string, counter?: number): Promise<number> {
    try {
      const dir = await opendir(directory);

      counter = counter || 0;

      for await (const file of dir) {
        if (file.name.startsWith('.')) continue;

        const isDir = await this.isDirectory(directory + '/' + file.name);

        if (isDir) {
          counter = await this.getFilesAmount(directory + '/' + file.name, counter);
        } else {
          counter++;
        }
      }
      return counter;
    } catch (err) {
      console.error(err);
    }
  }

  async isDirectory(filePath: string): Promise<boolean> {
    const isDir = await stat(filePath);
    return isDir.isDirectory();
  }

  async getTotalPages(dir: string): Promise<number> {
    const filesAmount = await this.getFilesAmount(dir);

    const defaultPagesNumber = 1;
    if (filesAmount <= PER_PAGE) return defaultPagesNumber;

    const remainder = filesAmount % PER_PAGE;
    if (remainder === 0) return filesAmount / PER_PAGE;

    return Math.trunc(filesAmount / PER_PAGE) + remainder;
  }

  async getAllFiles(directory: string, files?: string[]): Promise<string[]> {
    const dir = await opendir(directory);

    files = files || [];

    for await (const file of dir) {
      if (file.name.startsWith('.')) continue;

      const isDir = await this.isDirectory(directory + '/' + file.name);

      if (isDir) {
        files = await this.getAllFiles(directory + '/' + file.name, files);
      } else {
        files.push(directory + '/' + file.name);
      }
    }
    return files;
  }

  async getImagesPerPage(images: string[], page: number, perPage: number): Promise<string[]> {
    const endIndex = page * perPage;
    const start = endIndex - perPage;
    return images.slice(start, endIndex);
  }

  async getImages(page: number): Promise<string[]> {
    const images = await this.getAllFiles(IMAGES_DIR);
    return await this.getImagesPerPage(images, page, PER_PAGE);
  }
}
