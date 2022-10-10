import mongoose, { Schema } from 'mongoose';
import { stat } from 'node:fs/promises';
import { new_users } from '../users/users.js';

const ImagesSchema: Schema = new Schema({
  path: {type: String, required: true, unique: true},
  metadata: {type: Object, required: true}
});



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
  const user = await new_users.findOne({email: email}, {_id: 0, __v: 0} ).exec();
  return user;
}

export const images = mongoose.model('Image', ImagesSchema);
