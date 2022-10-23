import { opendir, stat } from 'node:fs/promises';
import { User } from '../models/user.model.js';
import { Image } from '../models/image.model.js';
import { GalleryFile } from '../gallery/gallery.file.js';
import { log } from '../helper/logger.js';
import mongoose from 'mongoose';
import { FileSystemService } from './file.system.service.js';
import { PER_PAGE } from '../data/constants.js';

const galleryService = new GalleryFile();
const fsService = new FileSystemService();

export class DbService {
  async uploadImageData(filePath): Promise<void> {

    const fileMetadata = await fsService.getFileMetadata(filePath);
    const pathWithoutBuiltFolder = fsService.removeFirstDirFromPath(filePath);

    const isImage = await Image.findOne({ path: pathWithoutBuiltFolder }).exec();
    if (isImage) return;

    const date = new Date();

    const image = new Image({
      path: pathWithoutBuiltFolder,
      metadata: fileMetadata,
      date: date
    });

    await image.save();
    log.info(`The image ${filePath} was saved`);
  }

  async addImagesData(directory: string): Promise<void> {
    const dir = await opendir(directory);

    for await (const file of dir) {
      if (file.name.startsWith('.')) continue;

      const directoryWithoutBuiltFolder = directory.split('/').slice(2).join('/');
      const filePath = directory + '/' + file.name;

      const isDir = await galleryService.isDirectory(filePath);

      if (isDir) {
        await this.addImagesData(filePath);
      } else {
        const fileStat = await stat(filePath);

        const pathWithoutBuiltFolder = directoryWithoutBuiltFolder + '/' + file.name;
        const isImage = await Image.findOne({ path: pathWithoutBuiltFolder }).exec();

        if (isImage) return;

        const date = new Date();
        const image = new Image({
          path: pathWithoutBuiltFolder,
          metadata: fileStat,
          date: date
        });
        await image.save();
      }
    }
  }

  async addDefaultUsers(): Promise<void> {
    const defaultUsersArray = [
      'asergeev@flo.team',
      'tpupkin@flo.team',
      'vkotikov@flo.team',
    ];

    const records = await User.find({ 'email': { $in: defaultUsersArray } });
    if (records.length) return;

    const asergeev = new User({
      email: 'asergeev@flo.team',
      password: 'jgF5tn4F',
    });
    await asergeev.save();
    log.info(`The user ${asergeev.email} was saved to DB.`);

    const tpupkin = new User({
      email: 'tpupkin@flo.team',
      password: 'tpupkin@flo.team',
    });
    await tpupkin.save();
    log.info(`The user ${tpupkin.email} was saved to DB.`);

    const vkotikov = new User({
      email: 'vkotikov@flo.team',
      password: 'po3FGas8',
    });
    await vkotikov.save();
    log.info(`The user ${vkotikov.email} was saved to DB.`);
  }

  async findUser(email: string){
    const user = await User.findOne({email: email}).select(['email', 'password']).exec();
    return user;
  }

  async getImagesNumber(): Promise<number> {
    const imagesNumber = await Image.count();
    return imagesNumber;
  }

  private async getImagesForLimit(limit: number): Promise<string[]> {
    const bdImages = await Image.find({}).select(['path', 'date']).sort({date: -1}).limit(limit);
    const sortFromOldToNew = (a, b) => a.date - b.date;
    bdImages.sort(sortFromOldToNew);
    return bdImages.map((item) => item.path);
  }

  async getImages(page: number, limit: number): Promise<string[]> {
    const images = await this.getImagesForLimit(limit);
    return await galleryService.getImagesPerPage(images, page, PER_PAGE);
  }

  private async connectToDb(mongoUrl) {
    try {
      await mongoose.connect(mongoUrl);
      console.log(`Database is running at ${mongoUrl}`);
    } catch (e) {
      console.log(e);
    }
  }

  private async addDefaultUsersToDB() {
    try {
      await this.addDefaultUsers();
      log.info('Default users have been added to DB.');
    } catch (e) {
      console.log(e);
    }
  }

  private async addImagesDataToDB(imagesDir) {
    try {
      await this.addImagesData(imagesDir);
      log.info('Images have been added to DB.');
    } catch (e) {
      console.log(e);
    }
  }

  async startDb(imagesDir, mongoUrl) {
    await this.connectToDb(mongoUrl);
    await this.addDefaultUsersToDB();
    await this.addImagesDataToDB(imagesDir);
  }
}
