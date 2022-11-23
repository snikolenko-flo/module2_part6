import * as dotenv from 'dotenv';
import express from 'express';
import { loginRouter, signUpRouter } from './login/router.js';
import { galleryRouter } from './gallery/router.js';
import { galleryHtmlRouter } from './gallery/gallery.html.router.js';
import { checkAuthorization } from './services/auth.service.js';
import { DbService } from './services/db-service.js';
dotenv.config();
import './login/auth.js';
import passport from 'passport';

const imagesDir = process.env.IMAGES_DIR;
const mongoUrl = process.env.MONGO_URL;
const hostname = process.env.HOST;
const port = process.env.PORT;

const dbService = new DbService();
dbService.startDb(imagesDir, mongoUrl);

const app = express();

app.use(express.json());
app.use(express.static('built'));
app.use('/', loginRouter);
app.use('/signup', signUpRouter);
app.use('/login', loginRouter);
app.use('/gallery.html', galleryHtmlRouter);
app.use('/gallery', passport.authenticate('jwt', { session: false }), galleryRouter);
app.use('/upload', passport.authenticate('jwt', { session: false }), galleryRouter);

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
