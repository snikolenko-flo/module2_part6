import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { loginRouter } from './login/router.js';
import { galleryRouter } from './gallery/router.js';
import { galleryHtmlRouter } from './gallery/gallery.html.router.js';
import { checkAuthorization } from './services/auth.service.js';
import { addDefaultUsersToDB, addImagesToDB } from './services/db-service.js';
import mongoose from 'mongoose';

const IMAGES_DIR = process.env.IMAGES_DIR;
const hostname = process.env.HOST;
const port = process.env.PORT;
const app = express();

console.log(`Images dir: ${IMAGES_DIR}`);

app.use(express.static('built'));
app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/gallery.html', galleryHtmlRouter);
app.use('/gallery', checkAuthorization, galleryRouter);
app.use('/upload', checkAuthorization, galleryRouter);

mongoose.connect('mongodb://localhost:27017/test').then(() => console.log('Database is connected.'));
addDefaultUsersToDB().then(() => console.log('Default users have been added to DB.'));
addImagesToDB(IMAGES_DIR).then(() => console.log('Images have been added to DB.'));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
