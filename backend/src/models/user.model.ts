import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  images: [{ type: Schema.Types.ObjectId, ref: 'Image' }]
});

UserSchema.pre(
  'save',
  async function(next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();
  }
);

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export const User = mongoose.model('User', UserSchema);
