import mongoose, { Schema } from 'mongoose';

const ImagesSchema: Schema = new Schema({
  path: {type: String, required: true, unique: true},
  metadata: {type: Object, required: true}
});

export const images = mongoose.model('Image', ImagesSchema);
