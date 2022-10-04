export const users = [
  {
    email: 'asergeev@flo.team',
    password: 'jgF5tn4F',
  },
  {
    email: 'tpupkin@flo.team',
    password: 'tpupkin@flo.team',
  },
  {
    email: 'vkotikov@flo.team',
    password: 'po3FGas8',
  },
];

import mongoose, {Schema} from 'mongoose';

mongoose.connect('mongodb://localhost:27017/test').then(()=>console.log('Database is connected!'));

const UserSchema: Schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

const new_users = mongoose.model('User', UserSchema);

const asergeev = new new_users({
  email: 'asergeev@flo.team',
  password: 'jgF5tn4F',
});
asergeev.save().then(() => console.log('asergeev was saved'));

const tpupkin = new new_users({
  email: 'tpupkin@flo.team',
  password: 'tpupkin@flo.team',
});
tpupkin.save().then(() => console.log('tpupkin was saved'));

const vkotikov = new new_users({
  email: 'vkotikov@flo.team',
  password: 'po3FGas8',
});
vkotikov.save().then(() => console.log('vkotikov was saved'));
