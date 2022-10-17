import {opendir, stat} from 'node:fs/promises';
import { users } from '../models/user.model.js';
import { images } from '../models/image.model.js';
import { GalleryFile } from '../gallery/gallery.file.js';

const GalleryService = new GalleryFile();

export async function uploadImageDataToDB(req) {

  const filePath = req.files[0].path;
  const fileStat = await stat(filePath);

  const pathWithoutBuiltFolder = filePath.split('/').slice(1).join('/');

  const isImage = await images.findOne({ path: pathWithoutBuiltFolder }).exec();
  if (isImage!==null) return;

  const image = new images({
    path: pathWithoutBuiltFolder,
    metadata: fileStat,
  });
  image.save().then(() => console.log(`The image ${filePath} was saved`));
}

export async function findUserInDB(email) {
  const user = await users.findOne({email: email}, {_id: 0, __v: 0} ).exec();
  return user;
}

export async function getImagesNumber() {
  const imagesNumber = await images.count();
  return imagesNumber;
}

export async function addDefaultUsersToDB() {
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
  asergeev.save();

  const tpupkin = new users({
    email: 'tpupkin@flo.team',
    password: 'tpupkin@flo.team',
  });
  tpupkin.save();

  const vkotikov = new users({
    email: 'vkotikov@flo.team',
    password: 'po3FGas8',
  });
  vkotikov.save();
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
