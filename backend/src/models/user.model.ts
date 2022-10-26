import mongoose, {Schema} from 'mongoose';

const UserSchema: Schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

export const User = mongoose.model('User', UserSchema);
