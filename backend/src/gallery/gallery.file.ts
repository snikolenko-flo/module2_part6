import { PER_PAGE } from '../data/constants.js';
import { opendir, stat } from 'node:fs/promises';
import { Image } from '../models/image.model.js';

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

    const onePage = 1;
    if (filesAmount <= PER_PAGE) return onePage;

    const remainder = filesAmount % PER_PAGE;
    if (remainder === 0) return filesAmount / PER_PAGE;

    return Math.trunc(filesAmount / PER_PAGE) + onePage;
  }

  async getTotalPagesForLimit(dir: string, limit: number): Promise<number> {
    const filesAmount = limit;

    const onePage = 1;
    if (filesAmount <= PER_PAGE) return onePage;

    const remainder = filesAmount % PER_PAGE;
    if (remainder === 0) return filesAmount / PER_PAGE;

    return Math.trunc(filesAmount / PER_PAGE) + onePage;
  }

  async getPagesAmount(dir: string, limit: number): Promise<number> {

    const filesAmount = limit;

    const onePage = 1;
    if (filesAmount <= PER_PAGE) return onePage;

    const remainder = filesAmount % PER_PAGE;
    if (remainder === 0) return filesAmount / PER_PAGE;

    return Math.trunc(filesAmount / PER_PAGE) + onePage;
  }

  async getImagesPerPage(images: string[], page: number, perPage: number): Promise<string[]> {
    const endIndex = page * perPage;
    const start = endIndex - perPage;
    return images.slice(start, endIndex);
  }

  async getImages(page: number, limit: number): Promise<string[]> {
    const images = await this.getImagesFromDB(limit);
    return await this.getImagesPerPage(images, page, PER_PAGE);
  }

  async getImagesFromDB(limit: number): Promise<string[]> {
    const bdImages = await Image.find({}).select(['path', 'date']).sort({date: -1}).limit(limit);
    const sortFromOldToNew = (a, b) => a.date - b.date;
    bdImages.sort(sortFromOldToNew);
    return bdImages.map((item) => item.path);
  }
}
