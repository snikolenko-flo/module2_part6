import {IMAGES_DIR, PER_PAGE} from '../data/constants.js';
import {opendir, stat} from 'node:fs/promises';
import {images} from '../services/db-service.js';

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

  async getPagesAmount(dir: string, limit: number): Promise<number> {

    const filesAmount = limit;

    const onePage = 1;
    if (filesAmount <= PER_PAGE) return onePage;

    const remainder = filesAmount % PER_PAGE;
    if (remainder === 0) return filesAmount / PER_PAGE;

    return Math.trunc(filesAmount / PER_PAGE) + onePage;
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
        const pathWithoutBuiltFolder = directory.split('/').slice(2).join('/');
        files.push(pathWithoutBuiltFolder + '/' + file.name);
      }
    }
    return files;
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

  async addImagesToDB(directory: string): Promise<void> {
    const dir = await opendir(directory);

    for await (const file of dir) {
      if (file.name.startsWith('.')) continue;

      const directoryWithoutBuiltFolder = directory.split('/').slice(2).join('/');

      const filePath = directory + '/' + file.name;
      const isDir = await this.isDirectory(filePath);

      if (isDir) {
        await this.addImagesToDB(filePath);
      } else {
        const fileStat = await stat(filePath);

        const pathWithoutBuiltFolder = directoryWithoutBuiltFolder + '/' + file.name;
        const isImage = await images.findOne({ path: pathWithoutBuiltFolder }).exec();
        if (isImage!==null) return;

        const image = new images({
          path: pathWithoutBuiltFolder,
          metadata: fileStat,
        });
        image.save().then(() => console.log(`The image ${filePath} was saved`));
      }
    }
  }
  async getImagesFromDB(limit: number) {
    const bdImages = await images.find({}, {_id: 0, metadata: 0, __v: 0}).limit(limit);
    return bdImages.map((item) => item.path);
  }
}
