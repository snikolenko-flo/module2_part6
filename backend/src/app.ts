import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { loginRouter } from './login/router.js';
import { galleryRouter } from './gallery/router.js';
import { galleryHtmlRouter } from './gallery/gallery.html.router.js';
import { checkAuthorization } from './services/auth.service.js';
import { addDefaultUsersToDB, addImagesToDB } from './services/db-service.js';
import { log } from './helper/logger.js';

dotenv.config();
const imagesdir = process.env.IMAGES_DIR;
const hostname = process.env.HOST;
const port = process.env.PORT;
const mongourl = process.env.MONGO_URL;
const app = express();

app.use(express.static('built'));
app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/gallery.html', galleryHtmlRouter);
app.use('/gallery', checkAuthorization, galleryRouter);
app.use('/upload', checkAuthorization, galleryRouter);

mongoose.connect(mongourl).then(() => console.log(`Database is running at ${mongourl}`));
addDefaultUsersToDB().then(() => log.info('Default users have been added to DB.'));
addImagesToDB(imagesdir).then(() => log.info('Images have been added to DB.'));

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
