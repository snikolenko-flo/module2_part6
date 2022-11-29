import mongoose, { Schema } from 'mongoose';
import crypto from 'node:crypto';

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true }
});

UserSchema.pre(
  'save',
  async function(next) {
    const hash = crypto.pbkdf2Sync(this.password, this.salt,
      1000,
      64,
      'sha512'
    ).toString('hex');

    this.password = hash;
    next();
  }
);

UserSchema.methods.isValidPassword = async function(password) {
  const hash = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    'sha512'
  ).toString('hex');

  return this.password === hash;
};

export const User = mongoose.model('User', UserSchema);
