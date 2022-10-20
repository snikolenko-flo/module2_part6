import { opendir, stat } from 'node:fs/promises';
import { users } from '../models/user.model.js';
import { images } from '../models/image.model.js';
import { GalleryFile } from '../gallery/gallery.file.js';
import { User } from '../interfaces/user.js';
import { log } from '../helper/logger.js';

const GalleryService = new GalleryFile();

export async function uploadImageDataToDB(req): Promise<void> {

  const filePath = req.files[0].path;
  const fileStat = await stat(filePath);

  const pathWithoutBuiltFolder = filePath.split('/').slice(1).join('/');

  const isImage = await images.findOne({ path: pathWithoutBuiltFolder }).exec();
  if (isImage!==null) return;

  const image = new images({
    path: pathWithoutBuiltFolder,
    metadata: fileStat,
  });
  image.save().then(() => log.info(`The image ${filePath} was saved`));
}

export async function findUserInDB(email: string){
  const user = await users.findOne({email: email}, {_id: 0, __v: 0} ).exec();
  return user;
}

export async function getImagesNumber(): Promise<number> {
  const imagesNumber = await images.count();
  return imagesNumber;
}

export async function addDefaultUsersToDB(): Promise<void> {
  const defaultUsersArray = [
    'asergeev@flo.team',
    'tpupkin@flo.team',
    'vkotikov@flo.team',
  ];

  const records = await users.find({ 'email': { $in: defaultUsersArray } });

  if (records.length !== 0) return;

  const asergeev = new users({
    email: 'asergeev@flo.team',
    password: 'jgF5tn4F',
  });
  asergeev.save().then(() => log.info(`The user ${asergeev.email} was saved to DB.`));

  const tpupkin = new users({
    email: 'tpupkin@flo.team',
    password: 'tpupkin@flo.team',
  });
  tpupkin.save().then(() => log.info(`The user ${tpupkin.email} was saved to DB.`));

  const vkotikov = new users({
    email: 'vkotikov@flo.team',
    password: 'po3FGas8',
  });
  vkotikov.save().then(() => log.info(`The user ${vkotikov.email} was saved to DB.`));
}

export async function addImagesToDB(directory: string): Promise<void> {
  const dir = await opendir(directory);

  for await (const file of dir) {
    if (file.name.startsWith('.')) continue;

    const directoryWithoutBuiltFolder = directory.split('/').slice(2).join('/');
    const filePath = directory + '/' + file.name;

    const isDir = await GalleryService.isDirectory(filePath);

    if (isDir) {
      await addImagesToDB(filePath);
    } else {
      const fileStat = await stat(filePath);

      const pathWithoutBuiltFolder = directoryWithoutBuiltFolder + '/' + file.name;
      const isImage = await images.findOne({ path: pathWithoutBuiltFolder }).exec();

      if (isImage!==null) return;

      const image = new images({
        path: pathWithoutBuiltFolder,
        metadata: fileStat,
      });
      image.save();
    }
  }
}
