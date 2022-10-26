import mongoose, { Schema } from 'mongoose';

const ImagesSchema: Schema = new Schema({
  path: {type: String, required: true, unique: true},
  metadata: {type: Object, required: true},
  date: {type: Date}
});

export const Image = mongoose.model('Image', ImagesSchema);
