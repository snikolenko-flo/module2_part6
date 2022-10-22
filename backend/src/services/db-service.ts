import { opendir, stat } from 'node:fs/promises';
import { users } from '../models/user.model.js';
import { images } from '../models/image.model.js';
import { GalleryFile } from '../gallery/gallery.file.js';
import { log } from '../helper/logger.js';

const GalleryService = new GalleryFile();

export class DbService {
  async uploadImageData(filePath): Promise<void> {

    const fileStat = await stat(filePath);
    const pathWithoutBuiltFolder = filePath.split('/').slice(1).join('/');

    const isImage = await images.findOne({ path: pathWithoutBuiltFolder }).exec();
    if (isImage) return;

    const date = new Date();

    const image = new images({
      path: pathWithoutBuiltFolder,
      metadata: fileStat,
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

      const isDir = await GalleryService.isDirectory(filePath);

      if (isDir) {
        await this.addImagesData(filePath);
      } else {
        const fileStat = await stat(filePath);

        const pathWithoutBuiltFolder = directoryWithoutBuiltFolder + '/' + file.name;
        const isImage = await images.findOne({ path: pathWithoutBuiltFolder }).exec();

        if (isImage!==null) return;

        const date = new Date();
        const image = new images({
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

    const records = await users.find({ 'email': { $in: defaultUsersArray } });
    if (records.length) return;

    const asergeev = new users({
      email: 'asergeev@flo.team',
      password: 'jgF5tn4F',
    });
    await asergeev.save();
    log.info(`The user ${asergeev.email} was saved to DB.`);

    const tpupkin = new users({
      email: 'tpupkin@flo.team',
      password: 'tpupkin@flo.team',
    });
    await tpupkin.save();
    log.info(`The user ${tpupkin.email} was saved to DB.`);

    const vkotikov = new users({
      email: 'vkotikov@flo.team',
      password: 'po3FGas8',
    });
    await vkotikov.save();
    log.info(`The user ${vkotikov.email} was saved to DB.`);
  }

  async findUser(email: string){
    const user = await users.findOne({email: email}, {_id: 0, __v: 0} ).exec();
    return user;
  }

  async getImagesNumber(): Promise<number> {
    const imagesNumber = await images.count();
    return imagesNumber;
  }
}
